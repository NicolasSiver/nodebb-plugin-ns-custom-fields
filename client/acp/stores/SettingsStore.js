var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter  = require('events').EventEmitter,
    assign        = require('react/lib/Object.assign'),
    Constants     = require('../Constants'),
    socket        = require('socket'),

    CHANGE_EVENT  = 'change',
    SOCKET_API    = {
        GET: 'plugins.ns-custom-fields.getSettings',
        SET: 'plugins.ns-custom-fields.setSettings'
    },
    _settings     = {};

var SettingsStore = assign({}, EventEmitter.prototype, {
    addChangeListener   : function (listener) {
        this.on(CHANGE_EVENT, listener);
    },
    emitChange          : function () {
        this.emit(CHANGE_EVENT);
    },
    getSettings         : function () {
        return _settings;
    },
    removeChangeListener: function (listener) {
        this.removeListener(CHANGE_EVENT, listener);
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case Constants.EVENT_GET_SETTINGS:
            socket.emit(SOCKET_API.GET, function (error, payload) {
                //if (error) {
                //    return nodebb.alertError(error.message);
                //}
                _settings = payload;
                SettingsStore.emitChange();
            });
            break;
        case Constants.EVENT_SAVE_SETTINGS:
            socket.emit(SOCKET_API.SET, action.settings, function (error, payload) {
                //if (error) {
                //    return nodebb.alertError(error.message);
                //}
                //_settings = payload;
                //SettingsStore.emitChange();
            });
            break;
        default:
            return true;
    }
});

module.exports = SettingsStore;