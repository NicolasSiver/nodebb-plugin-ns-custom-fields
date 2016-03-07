var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    FieldsStore    = require('../stores/FieldsStore'),
    FieldItem      = require('./FieldItem.react'),
    Actions        = require('../actions/Actions'),
    HTML5Backend   = require('react-dnd-html5-backend'),
    ReactDnd       = require('react-dnd');

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
        const len = this.state.fields.length, bodyElements = [];
        var i = 0, field;

        if (len < 1) {
            return <div className="alert alert-warning" role="alert">No Custom Fields</div>;
        }

        for (i; i < len; ++i) {
            field = this.state.fields[i];
            bodyElements.push(<FieldItem
                key={field.fid}
                field={field}
                index={i}
                id={field.fid}/>);
            bodyElements.push(<div
                key={'sep' + i}
                className="cf-separator"></div>);
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading">Custom Fields</div>
                <div className="panel-body">
                    <div className="cf-list">
                        <div className="cf-item cf-header">
                            <div className="cf-field-key">Key</div>
                            <div className="cf-field-type">Type</div>
                            <div className="cf-field-name">Name</div>
                        </div>

                        {bodyElements}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ReactDnd.DragDropContext(HTML5Backend)(FieldsList);
