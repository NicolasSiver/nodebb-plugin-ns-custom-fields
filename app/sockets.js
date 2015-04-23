(function (Module) {
    'use strict';

    var sockets   = require('./nodebb').pluginSockets,
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
        database.getFields(function (error, fields) {
            callback({
                fields: fields
            });
        });
    };

    Module.saveFields = function (socket, data, callback) {
        logger.log('verbose', socket, data);
        callback(new Error('just working on'));
    };

})(module.exports);