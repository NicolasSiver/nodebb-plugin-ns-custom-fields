var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter  = require('events').EventEmitter,
    assign        = require('react/lib/Object.assign'),
    Constants     = require('../Constants'),
    jQuery        = require('jQuery'),

    apiUri        = '../../api/admin/plugins/custom-fields',
    CHANGE_EVENT  = 'change',
    _fields       = [],
    count         = 0;

var FieldsStore = assign({}, EventEmitter.prototype, {
    addChangeListener   : function (listener) {
        this.on(CHANGE_EVENT, listener);
    },
    emitChange          : function () {
        this.emit(CHANGE_EVENT);
    },
    getAll              : function () {
        return _fields;
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
                    console.log(response);
                    _fields = response;
                    FieldsStore.emitChange();
                });

            break;
        case Constants.EVENT_CHANGE_FIELD_ORDER:
            //var len = _fields.length, index;
            //for (var i = 0; i < len; ++i) {
            //    if (_fields[i].id === action.id) {
            //        index = i;
            //        break;
            //    }
            //}
            //var element = _fields[index];
            //_fields[index] = _fields[index + action.offset];
            //_fields[index + action.offset] = element;
            break;
        case Constants.EVENT_CREATE_FIELD:
            //_fields.push({
            //    id  : ++count,
            //    key : action.key,
            //    name: action.name
            //});
            break;
        case Constants.EVENT_REMOVE_FIELD:
            //var len = _fields.length;
            //for (var i = 0; i < len; ++i) {
            //    if (_fields[i].id === action.id) {
            //        _fields.splice(i, 1);
            //        break;
            //    }
            //}
            break;
        default:
            return true;
    }

    return true;
});

module.exports = FieldsStore;