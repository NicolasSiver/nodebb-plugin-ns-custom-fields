(function (Controller) {
    'use strict';

    var async     = require('async'),
        util      = require('util'),
        keyMirror = require('keymirror'),

        settings  = require('./settings'),
        database  = require('./database'),
        constants = require('./constants'),
        logger    = require('./logger'),

        Types     = keyMirror({
            input : null,
            select: null
        });

    Controller.createField = function (key, name, type, meta, done) {
        if (!Types[type]) {
            return done(new Error(util.format('%s is not supported', type)));
        }

        logger.log('verbose', 'Create field', key, name, type, meta);

        database.createField(key, name, type, filterMeta(meta, type, name), done);
    };

    Controller.getCustomFields = function (uid, done) {
        async.parallel({
            fields: async.apply(database.getFields),
            data  : async.apply(database.getClientFields, uid)
        }, done);
    };

    Controller.getFilledFields = function (uid, done) {
        Controller.getCustomFields(uid, function (e, result) {
            if (e) {
                return done(e);
            }

            var customFields = [];

            if (result.data) {
                // Reduce to only populated fields
                var i = 0, len = result.fields.length, field;
                for (i; i < len; ++i) {
                    field = result.fields[i];
                    var value = result.data[field.key];
                    if (value) {
                        if (field.type == Types.select) {
                            customFields.push({
                                name : field.name,
                                value: getTextById(value, field.options)
                            });
                        } else {
                            customFields.push({
                                name : field.name,
                                value: value
                            });
                        }
                    }
                }
            }

            done(null, customFields);
        });
    };

    Controller.updateField = function (id, update, done) {
        database.updateFieldWithBody(id, update, done);
    };

    function filterMeta(meta, type, name) {
        var promptMessage = meta.prompt || name;
        var result = {
            prompt: promptMessage
        };

        switch (type) {
            case Types.select:
                //Shallow copy will be enough
                result.options = meta.options;
                break;
        }

        return result;
    }

    function getTextById(id, list) {
        var i = 0, len = list.length, item;
        for (i; i < len; ++i) {
            item = list[i];
            if (item.id == id) {
                return item.text;
            }
        }
    }

})(module.exports);