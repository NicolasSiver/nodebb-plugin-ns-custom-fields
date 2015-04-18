var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    Actions        = require('../actions/Actions');

var FieldItem = React.createClass({
    propTypes: {
        field: ReactPropTypes.object.isRequired
    },
    render   : function () {
        return (
            <div className="row custom-fields-item">
                <div className="col-lg-1"><i className="fa fa-bars"></i></div>
                <div className="col-lg-5">{this.props.field.key}</div>
                <div className="col-lg-6">{this.props.field.name} <button className="btn btn-danger" type="button">Delete</button></div>
            </div>
        );
    }
});

module.exports = FieldItem;