var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    FieldsStore    = require('../stores/FieldsStore'),
    FieldItem      = require('./FieldItem.react'),
    Actions        = require('../actions/Actions');

function getFieldsState() {
    return {
        fields: FieldsStore.getAll()
    };
}

var FieldsList = React.createClass({
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
        if (this.state.fields.length < 1) {
            return <div className="alert alert-warning" role="alert">No Custom Fields</div>;
        }
        function renderItem(field, index, list) {
            return <FieldItem
                key={field.fid}
                field={field}
                previous={index > 0}
                next={index < (list.length - 1)}/>
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading">Custom Fields</div>
                <div className="panel-body">
                    <div className="custom-fields-list">
                        <div className="row custom-fields-list-header">
                            <div className="col-lg-1">#</div>
                            <div className="col-lg-3">Key</div>
                            <div className="col-lg-3">Type</div>
                            <div className="col-lg-5">Name</div>
                        </div>
                        {this.state.fields.map(renderItem)}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = FieldsList;