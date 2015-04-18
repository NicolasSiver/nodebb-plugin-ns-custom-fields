var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter  = require('events').EventEmitter,
    assign        = require('react/lib/Object.assign'),
    Constants     = require('../Constants'),

    CHANGE_EVENT  = 'change',
    _fields       = [{id:0, key: 'PreKey', name: 'Initial Name'}],
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
        case Constants.EVENT_CREATE_FIELD:
            console.log(action.key, action.name);
            _fields.push({
                id  : ++count,
                key : action.key,
                name: action.name
            });
            break;
        default:
            return true;
    }

    FieldsStore.emitChange();

    return true;
});

module.exports = FieldsStore;