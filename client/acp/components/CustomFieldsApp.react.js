var React       = require('react'),
    FieldsList  = require('./FieldsList.react'),
    FieldInput  = require('./FieldInput.react'),
    FieldsStore = require('../stores/FieldsStore');

function getAppState() {
    return {
        fields: FieldsStore.getAll()
    };
}

var CustomFieldsApp = React.createClass({
    componentDidMount   : function () {
        FieldsStore.addChangeListener(this.fieldsDidChange);
    },
    componentWillUnmount: function () {
        FieldsStore.removeChangeListener(this.fieldsDidChange);
    },
    fieldsDidChange     : function () {
        this.setState(getAppState());
    },
    getInitialState     : function () {
        return getAppState();
    },
    render              : function () {
        return (
            <div className="row">
                <div className="col-lg-6">
                    <div className="panel panel-default">
                        <div className="panel-heading"><i className="fa fa-plus-square"/> Custom Fields</div>
                        <div className="panel-body">
                            <FieldInput />
                            <FieldsList fields={this.state.fields}/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="panel panel-default">
                        <div className="panel-body"/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = CustomFieldsApp;