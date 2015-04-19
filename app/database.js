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
        async.waterfall([
            function (next) {
                //key, start, stop, sort, withScores, callback
                db.getSortedSetRange(namespace, 0, 1000, 1, false, function (error, ids) {
                    if (error) {
                        return next(error);
                    }
                    next(null, ids);
                });
            },
            function (ids, next) {
                if (!ids.length) {
                    return next(null, ids);
                }
                db.getObjects(ids.map(function (id) {
                    return namespace + ':' + id;
                }), next);
            }
        ], function (error, fields) {
            if (error) {
                return done(error);
            }
            done(null, fields);
        });
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