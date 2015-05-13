var React        = require('react'),
    FieldsEditor = require('./FieldsEditor.react'),
    Settings     = require('./Settings.react');

var CustomFieldsApp = React.createClass({
    render: function () {
        //TODO Use New version notifier - http://registry.npmjs.org/nodebb-plugin-ns-custom-fields/latest
        return (
            <div className="row">
                <div className="col-md-5">
                    <FieldsEditor />
                </div>
                <div className="col-md-4">
                    <FieldsEditor />
                </div>
                <div className="col-md-3">
                    <Settings />

                    <div className="alert alert-info" role="alert">Plugin is under development. Don't hesitate to <a
                        href="https://github.com/NicolasSiver/nodebb-plugin-ns-custom-fields#todo" target="_blank">contribute</a>.
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = CustomFieldsApp;