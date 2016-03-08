(function (Socket) {
    'use strict';

    var controller = require('./controller'),
        sockets    = require('./nodebb').pluginSockets,
        settings   = require('./settings'),
        database   = require('./database'),
        constants  = require('./constants'),
        logger     = require('./logger'),

        namespace  = constants.SOCKETS;

    Socket.setup = function (callback) {
        sockets[namespace] = {};
        //Acknowledgements
        sockets[namespace].createField = Socket.createField;
        sockets[namespace].getFields = Socket.getFields;
        sockets[namespace].getSettings = Socket.getSettings;
        sockets[namespace].saveFields = Socket.saveFields;
        sockets[namespace].setSettings = Socket.setSettings;
        sockets[namespace].updateField = Socket.updateField;

        callback();
    };

    Socket.createField = function (socket, payload, callback) {
        controller.createField(payload.fieldKey, payload.fieldName, payload.fieldType, payload.fieldMeta || {}, callback);
    };

    Socket.getFields = function (socket, payload, callback) {
        controller.getCustomFields(payload.uid, callback);
    };

    Socket.getSettings = function (socket, callback) {
        callback(null, settings.get());
    };

    Socket.saveFields = function (socket, payload, callback) {
        logger.log('verbose', 'Storing fields for user: %d', payload.uid);
        database.saveClientFields(payload.uid, payload.data, callback);
    };

    Socket.setSettings = function (socket, values, callback) {
        settings.save(values, callback);
    };

    Socket.updateField = function (socket, payload, callback) {
        controller.updateField(payload.id, payload.update, callback);
    };

})(module.exports);