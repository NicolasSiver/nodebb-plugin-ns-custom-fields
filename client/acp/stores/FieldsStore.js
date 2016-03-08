var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter  = require('events').EventEmitter,
    assign        = require('react/lib/Object.assign'),
    keyMirror     = require('keyMirror'),
    Constants     = require('../Constants'),

    jQuery        = require('jquery'),
    socket        = require('socket'),

    API           = {
        CREATE_FIELD: 'plugins.ns-custom-fields.createField',
        UPDATE_FIELD: 'plugins.ns-custom-fields.updateField'
    },

    apiUri        = '../../api/admin/plugins/custom-fields',
    CHANGE_EVENT  = 'change',
    _fields       = [],
    _edits        = {},
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
        return _fields.map(function (field, index) {
            field.edit = _edits[field.fid];
            return field;
        });
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
        case Constants.EVENT_EDIT_FIELD_NAME:
            _edits[action.id] = {
                name : action.value,
                valid: action.value.length > 0
            };
            FieldsStore.emitChange();
            break;
        case Constants.EVENT_GET_ALL_FIELDS:
            getFields();
            break;
        case Constants.EVENT_EDIT_FIELD:
            var edit = _edits[action.id], field;

            if (!!edit) {
                if (!edit.valid) {
                    // As option, exit edit mode
                    return;
                }

                socket.emit(API.UPDATE_FIELD, {
                    id    : action.id,
                    update: {
                        name: edit.name
                    }
                }, function (error) {
                    // Optimistic update
                    delete _edits[action.id];
                    getFields();
                });
                return;
            }

            field = findFieldById(action.id, _fields);
            _edits[action.id] = {
                name : field.name,
                valid: true
            };
            FieldsStore.emitChange();
            break;
        case Constants.EVENT_CHANGE_FIELD_ORDER:
            const fromId = _fields[action.currentIndex].fid,
                  toId   = _fields[action.newIndex].fid;
            jQuery
                .ajax({
                    url       : apiUri + '/fields/' + fromId + '/swap',
                    method    : 'PUT',
                    data      : {
                        id: toId
                    },
                    beforeSend: function () {
                        //Optimistic swap
                        _fields = _fields.slice();
                        var tmpField = _fields[action.currentIndex];
                        _fields[action.currentIndex] = _fields[action.newIndex];
                        _fields[action.newIndex] = tmpField;
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

function findFieldById(id, list) {
    var i = 0, len = list.length, field;
    for (i; i < len; ++i) {
        field = list[i];
        if (field.fid === id) {
            return field;
        }
    }

    // To omit null value handling
    return {name: ''};
}

function getFields() {
    jQuery
        .ajax({
            url: apiUri + '/fields'
        })
        .done(function (response) {
            _fields = response;
            FieldsStore.emitChange();
        });
}

module.exports = FieldsStore;
