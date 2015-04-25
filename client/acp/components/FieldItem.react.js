var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    Actions        = require('../actions/Actions');

var FieldItem = React.createClass({
    propTypes: {
        field   : ReactPropTypes.object.isRequired,
        next    : ReactPropTypes.bool.isRequired,
        previous: ReactPropTypes.bool.isRequired
    },

    render: function () {
        var arrowPrevious, arrowNext;
        if (this.props.next) {
            arrowNext = <i className="fa fa-angle-down custom-fields-item-controls"
                           onClick={this._changeOrder.bind(this, 1)}></i>;
        }
        if (this.props.previous) {
            arrowPrevious = <i className="fa fa-angle-up custom-fields-item-controls"
                               onClick={this._changeOrder.bind(this, -1)}></i>;
        }

        return (
            <div className="row custom-fields-item">
                <div className="col-lg-1">{arrowPrevious} {arrowNext}</div>
                <div className="col-lg-5">{this.props.field.key}</div>
                <div className="col-lg-4">{this.props.field.name}</div>
                <div className="col-lg-2">
                    <div className="pull-right"><i
                        className="fa fa-times custom-fields-item-controls custom-fields-color-danger"
                        onClick={this._deleteItem}></i></div>
                </div>
            </div>
        );
    },

    _changeOrder: function (offset) {
        Actions.changeFieldOrder(this.props.field.fid, offset);
    },

    _deleteItem: function () {
        Actions.deleteField(this.props.field.fid);
    }
});

module.exports = FieldItem;