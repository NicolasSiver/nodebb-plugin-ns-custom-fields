(function (Filter) {
    'use strict';

    var async      = require('async'),
        controller = require('./controller'),
        database   = require('./database'),
        settings   = require('./settings'),
        constants  = require('./constants');

    var faIcon = 'fa-plus-square';

    //FIXME Move to controller
    var getCustomFields = function (uid, callback) {
        async.parallel({
            fields: async.apply(database.getFields),
            data  : async.apply(database.getClientFields, uid)
        }, function (error, result) {
            if (error) {
                return callback(error);
            }

            var customFields = [];

            if (result.data) {
                //Reduce to only populated fields
                var i = 0, len = result.fields.length, fieldMeta;
                for (i; i < len; ++i) {
                    fieldMeta = result.fields[i];
                    var value = result.data[fieldMeta.key];
                    if (value) {
                        customFields.push({
                            name : fieldMeta.name,
                            value: value
                        });
                    }
                }
            }

            callback(null, customFields);
        });
    };

    Filter.adminScripts = function (list, callback) {
        list.push('https://checkout.stripe.com/checkout.js');
        callback(null, list);
    };

    /**
     * Hook to render user profile.
     * 'userData' will be used as payload in hook handler.
     * @param params {object} Payload :{userData: userData, uid: callerUID}
     * @param callback {function}
     */
    Filter.account = function (params, callback) {
        controller.getFilledFields(params.userData.uid, function (error, fields) {
            if (error) {
                return callback(error);
            }
            params.userData.customFields = fields;
            callback(null, params);
        });
    };

    Filter.menu = function (custom_header, callback) {
        custom_header.plugins.push({
            route: '/plugins/custom-fields',
            icon : faIcon,
            name : 'Custom Fields'
        });
        callback(null, custom_header);
    };

    /**
     * Hook to render topic thread.
     * 'topicData' will be used as payload in hook handler.
     * @param topicData {object} Payload :{posts: [{user:{uid:postOwnerId}}], uid: topicOwnerId}
     * @param callback {function}
     */
    Filter.topic = function (topicData, callback) {
        if (!settings.isFilterTopics()) {
            return callback(null, topicData);
        }

        async.map(topicData.posts, function (post, next) {
            getCustomFields(post.user.uid, function (error, customFields) {
                if (error) {
                    return next(error);
                }
                post.customFields = customFields;
                next(null, post);
            });
        }, function (error, results) {
            if (error) {
                return callback(error);
            }
            topicData.posts = results;
            callback(null, topicData);
        });
    };

    Filter.userAccountEdit = function (data, callback) {
        data.editButtons.push({
            link: "./edit/custom-fields",
            text: "Change Extra"
        });

        callback(null, data);
    };

})(module.exports);