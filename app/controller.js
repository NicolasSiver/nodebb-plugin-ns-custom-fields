(function (Controller) {
    'use strict';

    var async     = require('async'),

        settings  = require('./settings'),
        database  = require('./database'),
        constants = require('./constants');

    Controller.createField = function (key, name, type, meta, done) {
        //database.createField(req.body.fieldKey, req.body.fieldName, function (error, field) {
        //    if (error) {
        //        return handleCriticalError(req, res, error);
        //    }
        //    res.json(field);
        //});
    };

})(module.exports);