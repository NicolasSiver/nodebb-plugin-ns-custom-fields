var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants     = require('../Constants');

module.exports = {
    changeOrder: function (from, to) {
        AppDispatcher.dispatch({
            actionType  : Constants.EVENT_CHANGE_FIELD_ORDER,
            currentIndex: from,
            newIndex    : to
        });
    },

    createField: function (key, name, type, meta) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_CREATE_FIELD,
            key       : key,
            name      : name,
            type      : type,
            meta      : meta
        });
    },

    deleteField: function (id) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_REMOVE_FIELD,
            id        : id
        });
    },

    editField: function (id) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_EDIT_FIELD,
            id        : id
        });
    },

    fieldNameWillEdit: function (id, value) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_EDIT_FIELD_NAME,
            id        : id,
            value     : value
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