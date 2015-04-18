var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    Actions        = require('../actions/Actions');

var FieldItem = React.createClass({
    propTypes: {
        field: ReactPropTypes.object.isRequired
    },

    render: function () {
        return (
            <div className="row custom-fields-item">
                <div className="col-lg-1"><i className="fa fa-bars"></i></div>
                <div className="col-lg-5">{this.props.field.key}</div>
                <div className="col-lg-4">{this.props.field.name}</div>
                <div className="col-lg-2"><div className="pull-right"><i className="fa fa-times custom-fields-item-controls custom-fields-color-danger" onClick={this._deleteItem}></i></div></div>
            </div>
        );
    },

    _deleteItem: function () {
        Actions.deleteField(this.props.field.id);
    }
});

module.exports = FieldItem;