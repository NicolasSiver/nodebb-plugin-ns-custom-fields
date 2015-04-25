var React          = require('react'),
    FieldsList     = require('./FieldsList.react'),
    FieldInput     = require('./FieldInput.react'),
    FieldsStore    = require('../stores/FieldsStore'),
    ReactPropTypes = React.PropTypes,
    Actions        = require('../actions/Actions');

function getFieldsState() {
    return {
        fields: FieldsStore.getAll()
    };
}

var FieldsEditor = React.createClass({
    componentDidMount: function () {
        FieldsStore.addChangeListener(this.fieldsDidChange);
        Actions.getFields();
    },

    componentWillUnmount: function () {
        FieldsStore.removeChangeListener(this.fieldsDidChange);
    },

    fieldsDidChange: function () {
        this.setState(getFieldsState());
    },

    getInitialState: function () {
        return getFieldsState();
    },

    render: function () {
        return (
            <div className="panel panel-default">
                <div className="panel-heading"><i className="fa fa-plus-square"/> Custom Fields</div>
                <div className="panel-body">
                    <FieldInput />
                    <FieldsList fields={this.state.fields}/>
                </div>
            </div>
        );
    }
});

module.exports = FieldsEditor;