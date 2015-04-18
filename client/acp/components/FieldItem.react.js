var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    Actions        = require('../actions/Actions');

var FieldItem = React.createClass({
    propTypes: {
        field: ReactPropTypes.object.isRequired
    },
    render   : function () {
        return (
            <li><i class="fa fa-bars"></i>{this.props.field.name}
                <button class="btn btn-danger" type="button">Delete</button>
            </li>
        );
    }
});

module.exports = FieldItem;