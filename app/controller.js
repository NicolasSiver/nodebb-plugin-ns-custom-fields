(function (Controller) {
    'use strict';

    var async     = require('async'),
        util      = require('util'),
        keyMirror = require('keymirror'),

        settings  = require('./settings'),
        database  = require('./database'),
        constants = require('./constants'),

        types     = keyMirror({
            input : null,
            select: null
        });

    Controller.createField = function (key, name, type, meta, done) {
        if (!types[type]) {
            return done(new Error(util.format('%s is not supported', type)));
        }

        database.createField(key, name, type, filterMeta(meta, type, name), done);
    };

    function filterMeta(meta, type, name) {
        var promptMessage = meta.prompt || name;
        var result = {
            prompt: promptMessage
        };

        switch (type) {
            case types.select:
                //Shallow copy will be enough
                result.options = meta.options;
                break;
        }

        return result;
    }

})(module.exports);