(function (Database) {
    'use strict';

    var async     = require('async'),
        db        = require('./nodebb').db,
        namespace = 'ns:custom_fields';

    var createField = function (id, key, name) {
        return {
            fid : id,
            key : key,
            name: name
        };
    };

    Database.createField = function (key, name, done) {
        async.waterfall([
            function (next) {
                db.incrObjectField('global', 'nextNsCustomFieldId', function (error, id) {
                    if (error) {
                        return next(error);
                    }
                    next(null, id);
                });
            }, function (id, next) {
                //Any incremental integer will suffice
                var sortPosition = id;
                db.sortedSetAdd(namespace, sortPosition, id, function (error) {
                    if (error) {
                        return next(error);
                    }
                    next(null, id);
                });
            }, function (id, next) {
                var fieldModel = createField(id, key, name);
                db.setObject(namespace + ':' + id, fieldModel, function (error) {
                    if (error) {
                        return next(error);
                    }

                    next(null, fieldModel);
                });
            }
        ], function (error, field) {
            if (error) {
                return done(error);
            }
            done(null, field);
        });
    };

    Database.getFields = function (done) {

    };

    Database.swapFields = function (fromId, toId, done) {

    };

    Database.updateField = function (id, key, name, done) {
        //TODO Security check for field existence
        var _key = namespace + ':' + id;
        async.waterfall([
            function (next) {
                var fieldModel = createField(id, key, name);
                db.setObject(_key, fieldModel, function (error) {
                    if (error) {
                        return next(error);
                    }
                    next(null);
                });
            },
            function (next) {
                db.getObject(_key, function (error, field) {
                    if (error) {
                        return next(error);
                    }
                    next(null, field);
                });
            }
        ], function (error, field) {
            if (error) {
                return done(error);
            }
            done(null, field);
        });
    };

})(module.exports);