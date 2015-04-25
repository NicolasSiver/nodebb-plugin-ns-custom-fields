var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants     = require('../Constants');

module.exports = {
    changeFieldOrder: function (id, offset) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_CHANGE_FIELD_ORDER,
            id        : id,
            offset    : offset
        });
    },

    createField: function (key, name) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_CREATE_FIELD,
            key       : key,
            name      : name
        });
    },

    deleteField: function (id) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_REMOVE_FIELD,
            id        : id
        });
    },

    getFields: function () {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_GET_ALL_FIELDS
        });
    },

    getSettings: function () {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_GET_SETTINGS
        });
    },

    saveSettings: function (settings) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_SAVE_SETTINGS,
            settings  : settings
        });
    }
};