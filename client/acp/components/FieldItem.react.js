var Actions        = require('../actions/Actions'),
    Bootbox        = require('bootbox'),
    classNames     = require('classnames'),
    FieldsStore    = require('../stores/FieldsStore'),
    React          = require('react'),
    ReactDnd       = require('react-dnd'),
    ReactDom       = require('react-dom'),
    ReactPropTypes = React.PropTypes;

const sourceSpec = {
    beginDrag: function (props) {
        return {
            id   : props.id,
            index: props.index
        };
    }
};

const targetSpec = {
    hover: function (props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = ReactDom.findDOMNode(component).getBoundingClientRect();
        const clientOffset = monitor.getClientOffset();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) >> 1;
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        Actions.changeOrder(dragIndex, hoverIndex);

        // Optimistic change, mutation
        monitor.getItem().index = hoverIndex;
    }
};

var FieldItem = React.createClass({
    propTypes: {
        field            : ReactPropTypes.object.isRequired,
        index            : ReactPropTypes.number.isRequired,
        id               : ReactPropTypes.any.isRequired,
        isDragging       : ReactPropTypes.bool.isRequired,
        connectDragSource: ReactPropTypes.func.isRequired,
        connectDropTarget: ReactPropTypes.func.isRequired
    },

    deleteItem: function () {
        const fieldId = this.props.field.fid;
        Bootbox.confirm({
            title   : 'Attention: Field Deletion',
            message : 'You are going to delete Custom Field. Are you sure?',
            buttons : {
                confirm: {
                    label: "Delete"
                }
            },
            callback: function (result) {
                if (result) {
                    Actions.deleteField(fieldId);
                }
            }
        });
    },

    editItem: function () {
        Actions.editField(this.props.field.fid);
    },

    keyDidPress: function (e) {
        if (e.key === 'Enter') {
            this.editItem();
        }
    },

    nameDidChange: function (e) {
        Actions.fieldNameWillEdit(this.props.field.fid, e.target.value);
    },

    render: function () {
        var typeContent, Type = FieldsStore.getTypeEnum();
        const isEdit = !!this.props.field.edit;
        const editClass = classNames(
            'fa', 'custom-fields-item-controls',
            {'fa-pencil': !isEdit, 'fa-check': isEdit, 'cf-color-success': isEdit && this.props.field.edit.valid}
        );
        const editContent = isEdit ? <input
            type="text"
            className="form-control"
            placeholder="Enter name"
            value={this.props.field.edit.name}
            onChange={this.nameDidChange}
            onKeyDown={this.keyDidPress}/> : this.props.field.name;

        switch (this.props.field.type) {
            case Type.input:
                typeContent = FieldsStore.getTypeName(Type.input);
                break;
            case Type.select:
                typeContent = FieldsStore.getTypeName(Type.select) + ' (' + this.props.field.options.length + ')';
                break;
        }

        return this.props.connectDragSource(this.props.connectDropTarget(
            <div className="cf-item" style={{opacity: this.props.isDragging ? 0.2 : 1}}>
                <div className="cf-field-key">{this.props.field.key}</div>
                <div className="cf-field-type">{typeContent}</div>
                <div className="cf-field-name">{editContent}</div>
                <div className="cf-field-actions">
                    <div className="pull-right">
                        <i className={editClass}
                           onClick={this.editItem}></i>
                        <i className="fa fa-trash-o custom-fields-item-controls custom-fields-color-danger"
                           onClick={this.deleteItem}></i>
                    </div>
                </div>
            </div>
        ));
    }
});

module.exports = ReactDnd.DragSource('field-item', sourceSpec, function (connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging       : monitor.isDragging()
    };
})(ReactDnd.DropTarget('field-item', targetSpec, function (connect) {
    return {
        connectDropTarget: connect.dropTarget()
    };
})(FieldItem));
