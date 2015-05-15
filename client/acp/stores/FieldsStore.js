var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter  = require('events').EventEmitter,
    assign        = require('react/lib/Object.assign'),
    keyMirror     = require('react/lib/keyMirror'),
    Constants     = require('../Constants'),

    jQuery        = require('jquery'),
    socket        = require('socket'),

    API           = {
        CREATE_FIELD: 'plugins.ns-custom-fields.createField'
    },

    apiUri        = '../../api/admin/plugins/custom-fields',
    CHANGE_EVENT  = 'change',
    _fields       = [],
    _types        = [
        {name: 'Input', type: 'input'},
        {name: 'Select', type: 'select'}
    ],
    _type         = keyMirror({
        input : null,
        select: null
    }),
    count         = 0;

var FieldsStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (listener) {
        this.on(CHANGE_EVENT, listener);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getAll: function () {
        return _fields;
    },

    getDefaultFieldType: function () {
        return _types[0].type;
    },

    getTypes: function () {
        return _types;
    },

    getTypeEnum: function () {
        return _type;
    },

    getTypeName: function (type) {
        var i = 0, len = _types.length, typeEntity;
        for (i; i < len; ++i) {
            typeEntity = _types[i];
            if (typeEntity.type === type) {
                return typeEntity.name;
            }
        }
    },

    removeChangeListener: function (listener) {
        this.removeListener(CHANGE_EVENT, listener);
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case Constants.EVENT_GET_ALL_FIELDS:
            jQuery
                .ajax({
                    url: apiUri + '/fields'
                })
                .done(function (response) {
                    _fields = response;
                    FieldsStore.emitChange();
                });

            break;
        case Constants.EVENT_CHANGE_FIELD_ORDER:
            var len = _fields.length, fromIndex, toIndex, i = 0, fromId = action.id, tmpField;
            for (i; i < len; ++i) {
                if (_fields[i].fid === fromId) {
                    fromIndex = i;
                    toIndex = i + action.offset;
                    break;
                }
            }
            jQuery
                .ajax({
                    url       : apiUri + '/fields/' + fromId + '/swap',
                    method    : 'PUT',
                    data      : {
                        id: _fields[toIndex].fid
                    },
                    beforeSend: function () {
                        //Optimistic swap
                        tmpField = _fields[fromIndex];
                        _fields[fromIndex] = _fields[toIndex];
                        _fields[toIndex] = tmpField;
                        FieldsStore.emitChange();
                    }
                })
                .done(function (response) {
                    //noop
                });
            break;
        case Constants.EVENT_CREATE_FIELD:
            socket.emit(API.CREATE_FIELD, {
                fieldKey : action.key,
                fieldName: action.name,
                fieldType: action.type,
                fieldMeta: action.meta
            }, function (error, field) {
                _fields.push(field);
                FieldsStore.emitChange();
            });
            break;
        case Constants.EVENT_REMOVE_FIELD:
            jQuery
                .ajax({
                    url       : apiUri + '/fields/' + action.id,
                    method    : 'DELETE',
                    beforeSend: function () {
                        //Optimistic delete
                        var len = _fields.length, i = 0;
                        for (i; i < len; ++i) {
                            if (_fields[i].fid === action.id) {
                                _fields.splice(i, 1);
                                FieldsStore.emitChange();
                                break;
                            }
                        }
                    }
                })
                .done(function (response) {
                    //noop
                });
            break;
        default:
            return true;
    }

    return true;
});

module.exports = FieldsStore;