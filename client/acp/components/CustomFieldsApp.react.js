var Donate      = require('./Donate.react'),
    React       = require('react'),
    FieldsList  = require('./FieldsList.react'),
    CreateField = require('./CreateField.react'),
    Settings    = require('./Settings.react');

var CustomFieldsApp = React.createClass({
    render: function () {
        //TODO Use New version notifier - http://registry.npmjs.org/nodebb-plugin-ns-custom-fields/latest
        return (
            <div className="row">
                <div className="col-md-5">
                    <FieldsList />
                </div>
                <div className="col-md-4">
                    <CreateField />
                </div>
                <div className="col-md-3">
                    <Settings />
                    <Donate />
                </div>
            </div>
        );
    }
});

module.exports = CustomFieldsApp;