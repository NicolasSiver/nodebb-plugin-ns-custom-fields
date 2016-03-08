(function (Database) {
    'use strict';

    var async        = require('async'),
        objectAssign = require('object-assign'),

        db           = require('./nodebb').db,
        constants    = require('./constants'),
        namespace    = constants.NAMESPACE,
        logger       = require('./logger');

    var createField = function (id, key, name, type) {
        return {
            fid : id,
            key : key,
            name: name,
            type: type
        };
    };

    var createObjectKey = function (uid) {
        return 'user:' + uid + ':' + namespace;
    };

    Database.createField = function (key, name, type, meta, done) {
        //Secure key
        var notSecureFields = ['_key', '_id'];
        var index = notSecureFields.indexOf(key);
        if (index != -1) {
            logger.log('warn', '%s field is not allowed, please use another', key);
            return done(new Error(key + ' field is not allowed'));
        }

        async.waterfall([
            function (next) {
                db.incrObjectField('global', 'nextNsCustomFieldId', next);
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
                var fieldModel = objectAssign(createField(id, key, name, type), meta);
                db.setObject(namespace + ':' + id, fieldModel, function (error) {
                    if (error) {
                        return next(error);
                    }

                    next(null, fieldModel);
                });
            }
        ], done);
    };

    Database.deleteField = function (id, done) {
        //TODO Security check for field existence
        async.parallel([
            function (next) {
                db.sortedSetRemove(namespace, id, next);
            }, function (next) {
                db.delete(namespace + ':' + id, next);
            }
        ], function (error, results) {
            if (error) {
                return done(error);
            }
            done(null);
        });
    };

    Database.getClientFields = function (uid, done) {
        db.getObject(createObjectKey(uid), done);
    };

    Database.getFields = function (done) {
        async.waterfall([
            function (next) {
                //key, start, stop, callback
                db.getSortedSetRange(namespace, 0, -1, next);
            },
            function (ids, next) {
                if (!ids.length) {
                    return next(null, ids);
                }
                db.getObjects(ids.map(function (id) {
                    return namespace + ':' + id;
                }), next);
            }
        ], done);
    };

    Database.saveClientFields = function (uid, fields, done) {
        var data = {}, i = 0, len = fields.length, fieldMeta;

        for (i; i < len; ++i) {
            fieldMeta = fields[i];
            data[fieldMeta.name] = fieldMeta.value;
        }

        db.setObject(createObjectKey(uid), data, function (error) {
            if (error) {
                return done(error);
            }
            done(null);
        });
    };

    Database.swapFields = function (fromId, toId, done) {
        async.waterfall([
            function (next) {
                //key, start, stop, callback
                db.getSortedSetRangeWithScores(namespace, 0, 1000, next);
            }, function (sortedFields, next) {
                var fromScore = -1, toScore = -1, i = 0, len = sortedFields.length, field;
                for (i; i < len; ++i) {
                    field = sortedFields[i];
                    if (fromId == field.value) {
                        fromScore = field.score;
                    } else if (toId == field.value) {
                        toScore = field.score;
                    } else if (fromScore >= 0 && toScore >= 0) {
                        break;
                    }
                }

                if (fromScore == -1 || toScore == -1) {
                    return next(new Error('Something went wrong, provided field Ids can not be found'));
                }

                next(null, fromScore, toScore);
            }, function (fromScore, toScore, next) {
                async.parallel({
                    updateFrom: function (callback) {
                        db.sortedSetAdd(namespace, toScore, fromId, function (error) {
                            if (error) {
                                return callback(error);
                            }
                            callback(null);
                        });
                    },
                    updateTo  : function (callback) {
                        db.sortedSetAdd(namespace, fromScore, toId, function (error) {
                            if (error) {
                                return callback(error);
                            }
                            callback(null);
                        });
                    }
                }, function (error, results) {
                    if (error) {
                        return next(error);
                    }
                    next(null);
                });
            }, Database.getFields
        ], function (error, fields) {
            if (error) {
                return done(error);
            }
            done(null, fields);
        });
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

    Database.updateFieldWithBody = function (id, update, done) {
        async.waterfall([
            async.apply(db.setObject, namespace + ':' + id, update)
        ], done);
    };

})(module.exports);