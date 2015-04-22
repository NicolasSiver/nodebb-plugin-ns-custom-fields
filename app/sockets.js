(function (Module) {
    'use strict';

    var sockets   = require('./nodebb').pluginSockets,
        database  = require('./database'),

        namespace = 'ns-custom-fields';

    Module.setup = function (callback) {
        sockets[namespace] = {};
        //Acknowledgements
        sockets[namespace].getFields = Module.getFields;

        callback();
    };

    Module.getFields = function (socket, callback) {
        database.getFields(function (error, fields) {
            callback({
                fields: fields
            });
        });
    };

})(module.exports);