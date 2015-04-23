(function (Filter) {
    'use strict';

    var async     = require('async'),
        database  = require('./database'),
        constants = require('./constants'),
        logger    = require('winston').loggers.get(constants.LOGGER);

    /**
     * Hook to render user profile.
     * 'userData' will be used as payload in hook handler.
     * @param params {object} Payload :{userData: userData, uid: callerUID}
     * @param callback {function}
     */
    Filter.account = function (params, callback) {
        async.parallel({
            fields: async.apply(database.getFields),
            data  : async.apply(database.getClientFields, params.userData.uid)
        }, function (error, result) {
            if (error) {
                return callback(error);
            }

            //Reduce to only populated fields
            var i = 0, len = result.fields.length, fieldMeta, customFields = [];
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
            params.customFields = customFields;
            callback(null, params);
        });
    };

    Filter.menu = function (custom_header, callback) {
        custom_header.plugins.push({
            route: '/plugins/custom-fields',
            icon : 'fa-plus-square',
            name : 'Custom Fields'
        });
        callback(null, custom_header);
    };

})(module.exports);