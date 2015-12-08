(function (Module) {
    'use strict';

    var controller = require('./controller'),
        sockets    = require('./nodebb').pluginSockets,
        settings   = require('./settings'),
        database   = require('./database'),
        constants  = require('./constants'),
        logger     = require('./logger'),

        namespace  = constants.SOCKETS;

    Module.setup = function (callback) {
        sockets[namespace] = {};
        //Acknowledgements
        sockets[namespace].createField = Module.createField;
        sockets[namespace].getFields = Module.getFields;
        sockets[namespace].getSettings = Module.getSettings;
        sockets[namespace].saveFields = Module.saveFields;
        sockets[namespace].setSettings = Module.setSettings;

        callback();
    };

    Module.createField = function (socket, payload, callback) {
        controller.createField(payload.fieldKey, payload.fieldName, payload.fieldType, payload.fieldMeta || {}, callback);
    };

    Module.getFields = function (socket, payload, callback) {
        controller.getCustomFields(payload.uid, callback);
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