var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants     = require('../Constants');

module.exports = {
    createField: function (key, name) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_CREATE_FIELD,
            key       : key,
            name      : name
        });
    }
};