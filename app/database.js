(function (Database) {
    'use strict';

    var db        = require('./nodebb').db,
        namespace = 'ns:custom_fields';

    //TODO Use async waterfall
    Database.createField = function (key, name, done) {
        db.incrObjectField('global', 'nextNsCustomFieldId', function (error, id) {
            if (error) {
                return done(error);
            }

            //Any incremental integer will suffice
            var sortPosition = id;

            db.sortedSetAdd(namespace, sortPosition, id, function (error) {
                if (error) {
                    return done(error);
                }

                var fieldModel = {
                    fid : id,
                    key : key,
                    name: name
                };

                db.setObject(namespace + ':' + id, fieldModel, function (error) {
                    if (error) {
                        return done(error);
                    }

                    done(null, fieldModel);
                });
            });
        });
    };

    Database.getFields = function (done) {

    };

    Database.swapFields = function (fromId, toId, done) {

    };

    Database.updateField = function (id, key, name, done) {

    };

})(module.exports);