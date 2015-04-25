(function (Module) {
    'use strict';

    var async     = require('async'),

        sockets   = require('./nodebb').pluginSockets,
        settings  = require('./settings'),
        database  = require('./database'),
        constants = require('./constants'),
        logger    = require('winston').loggers.get(constants.LOGGER),

        namespace = 'ns-custom-fields';

    Module.setup = function (callback) {
        sockets[namespace] = {};
        //Acknowledgements
        sockets[namespace].getFields = Module.getFields;
        sockets[namespace].getSettings = Module.getSettings;
        sockets[namespace].saveFields = Module.saveFields;
        sockets[namespace].setSettings = Module.setSettings;

        callback();
    };

    Module.getFields = function (socket, payload, callback) {
        async.parallel({
            fields: async.apply(database.getFields),
            data  : async.apply(database.getClientFields, payload.uid)
        }, function (error, result) {
            if (error) {
                callback(error);
            } else {
                callback(null, result);
            }
        });
    };

    Module.getSettings = function (socket, callback) {
        callback(null, settings.get());
    };

    Module.saveFields = function (socket, payload, callback) {
        logger.log('verbose', 'Storing fields for user: %d', payload.uid);
        database.saveClientFields(payload.uid, payload.data, callback);
    };

    Module.setSettings = function (socket, values, callback) {
        settings.save(values, callback);
    };

})(module.exports);