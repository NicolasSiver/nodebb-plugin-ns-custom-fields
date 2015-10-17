var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    Actions        = require('../actions/Actions'),
    FieldsStore    = require('../stores/FieldsStore');

var FieldItem = React.createClass({
    propTypes: {
        field   : ReactPropTypes.object.isRequired,
        next    : ReactPropTypes.bool.isRequired,
        previous: ReactPropTypes.bool.isRequired
    },

    render: function () {
        var arrowPrevious, arrowNext, typeContent, Type = FieldsStore.getTypeEnum();
        if (this.props.next) {
            arrowNext = <i className="fa fa-angle-down custom-fields-item-controls"
                           onClick={this._changeOrder.bind(this, 1)}></i>;
        }
        if (this.props.previous) {
            arrowPrevious = <i className="fa fa-angle-up custom-fields-item-controls"
                               onClick={this._changeOrder.bind(this, -1)}></i>;
        }

        switch (this.props.field.type) {
            case Type.input:
                typeContent = FieldsStore.getTypeName(Type.input);
                break;
            case Type.select:
                typeContent = FieldsStore.getTypeName(Type.select) + ' (' + this.props.field.options.length + ')';
                break;
        }

        return (
            <div className="row custom-fields-item">
                <div className="col-lg-1">{arrowPrevious}{arrowNext}</div>
                <div className="col-lg-3">{this.props.field.key}</div>
                <div className="col-lg-3">{typeContent}</div>
                <div className="col-lg-3">{this.props.field.name}</div>
                <div className="col-lg-2">
                    <div className="pull-right"><i
                        className="fa fa-trash-o custom-fields-item-controls custom-fields-color-danger"
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