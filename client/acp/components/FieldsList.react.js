var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    FieldItem      = require('./FieldItem.react');

var FieldsList = React.createClass({
    propTypes: {
        fields: ReactPropTypes.array.isRequired
    },

    render: function () {
        if (this.props.fields.length < 1) {
            return null;
        }
        function renderItem(field) {
            return <FieldItem key={field.id} field={field}/>
        }

        return (
            <div id="fieldsList">
                <div className="row custom-fields-list-header">
                    <div className="col-lg-1">#</div>
                    <div className="col-lg-5">Key</div>
                    <div className="col-lg-6">Name</div>
                </div>
                {this.props.fields.map(renderItem)}
            </div>
        );
    }
});

module.exports = FieldsList;