(function (Module) {
    'use strict';

    var async     = require('async'),

        sockets   = require('./nodebb').pluginSockets,
        database  = require('./database'),
        constants = require('./constants'),
        logger    = require('winston').loggers.get(constants.LOGGER),

        namespace = 'ns-custom-fields';

    Module.setup = function (callback) {
        sockets[namespace] = {};
        //Acknowledgements
        sockets[namespace].getFields = Module.getFields;
        sockets[namespace].saveFields = Module.saveFields;

        callback();
    };

    Module.getFields = function (socket, callback) {
        async.parallel({
            fields: function (done) {
                database.getFields(done);
            },
            data  : function (done) {
                database.getClientFields(socket.uid, done);
            }
        }, function (error, result) {
            if (error) {
                callback(error);
            } else {
                callback(null, result);
            }
        });
    };

    Module.saveFields = function (socket, data, callback) {
        logger.log('verbose', 'Storing fields for user: %d', socket.uid);
        database.saveClientFields(socket.uid, data, callback);
    };

})(module.exports);