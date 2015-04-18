var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    FieldItem      = require('./FieldItem.react');

var FieldsList = React.createClass({
    propTypes: {
        fields: ReactPropTypes.array.isRequired
    },
    render   : function () {
        if (this.props.fields.length < 1) {
            return null;
        }
        function renderItem(field) {
            return <FieldItem key={field.id} field={field}/>
        }

        return (
            <ul>{this.props.fields.map(renderItem)}</ul>
        );
    }
});

module.exports = FieldsList;