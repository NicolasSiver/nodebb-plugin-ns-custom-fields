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
                //key, start, stop, callback
                db.getSortedSetRange(namespace, 0, 1000, function (error, ids) {
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
        async.waterfall([
            function (next) {
                //key, start, stop, callback
                db.getSortedSetRangeWithScores(namespace, 0, 1000, function (error, sortedFields) {
                    if (error) {
                        return next(error);
                    }
                    next(null, sortedFields);
                });
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

})(module.exports);