var React          = require('react'),
    ReactPropTypes = React.PropTypes,

    ENTER_KEY_CODE = 13,
    placeholder    = createPlaceholder();

function createPlaceholder() {
    var element = document.createElement("li");
    var content = document.createTextNode("Drop here");
    element.className = "options-placeholder";
    element.appendChild(content);
    return element;
}

var SelectManager = React.createClass({
    propTypes: {
        options : ReactPropTypes.array.isRequired,
        onUpdate: ReactPropTypes.func.isRequired
    },

    getInitialState: function () {
        return {
            optionId  : this.props.optionId || '',
            optionText: this.props.optionText || ''
        };
    },

    render: function () {
        var self = this;

        function renderOption(option, index) {
            return <li
                className="options-list-item"
                data-id={index}
                key={index}
                draggable="true"
                onDragEnd={self._dragDidEnd}
                onDragStart={self._dragDidStart}>
                <i className="fa fa-sort"></i> {option.id} - {option.text}
                <div className="pull-right">
                    <i className="fa fa-times" onClick={self._deleteOptionItem.bind(null, index)}></i>
                </div>
            </li>
        }

        return (
            <div className="options-manager">
                <p>Options:</p>

                <ul
                    className="options-list"
                    onDragOver={this._dragDidOver}>
                    {this.props.options.map(renderOption)}
                </ul>

                <div className="row options-controls">
                    <div className="col-md-2">
                        <input
                            type="text"
                            maxLength="3"
                            className="form-control"
                            value={this.state.optionId}
                            onChange={this._inputDidChange.bind(null, 'optionId')}
                            placeholder="Id"/>
                    </div>
                    <div className="col-md-7">
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.optionText}
                            onChange={this._inputDidChange.bind(null, 'optionText')}
                            onKeyDown={this._onKeyDown}
                            placeholder="Label"/>
                    </div>
                    <div className="col-md-3">
                        <button
                            className="btn btn-primary btn-block"
                            type="button"
                            disabled={this._isValidInput() ? '' : 'disabled'}
                            onClick={this._addOptionItem}>
                            <i className="fa fa-plus fa-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    },

    _addOptionItem: function () {
        var newItem = {id: this.state.optionId, text: this.state.optionText};
        this.setState({
            optionId  : '',
            optionText: ''
        }, function () {
            this.props.onUpdate(this.props.options.concat([newItem]));
        });
    },

    _deleteOptionItem: function (index) {
        var options = this.props.options;
        options.splice(index, 1);
        this.props.onUpdate(options);
    },

    _dragDidEnd: function (e) {
        this.dragged.style.display = "block";
        this.dragged.parentNode.removeChild(placeholder);

        var options = this.props.options;
        var from = parseInt(this.dragged.dataset.id, 10);
        var to = parseInt(this.over.dataset.id, 10);

        if (from != to) {
            if (from < to) to--;
            if (this.placement == "after") to++;
            options.splice(to, 0, options.splice(from, 1)[0]);
            this.props.onUpdate(options);
        }
    },

    _dragDidOver: function (e) {
        e.preventDefault();
        this.dragged.style.display = "none";

        if (e.target != placeholder && e.target.tagName == 'LI') {
            this.over = e.target;

            var bounds = this.over.getBoundingClientRect();
            var body = document.body;
            var docElem = document.documentElement;
            var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
            var clientTop = docElem.clientTop || body.clientTop || 0;
            var top = bounds.top + scrollTop - clientTop;
            var posY = e.pageY - top;
            var height = bounds.height >> 1;
            var parent = e.target.parentNode;

            if (posY > height) {
                this.placement = "after";
                parent.insertBefore(placeholder, e.target.nextElementSibling);
            } else {
                this.placement = "before";
                parent.insertBefore(placeholder, e.target);
            }
        }
    },

    _dragDidStart: function (e) {
        this.dragged = e.currentTarget;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData("text/html", e.currentTarget);
    },

    _inputDidChange: function (key, e) {
        var update = {};
        update[key] = e.currentTarget.value;
        this.setState(update);
    },

    _isValidInput: function () {
        return this.state.optionId && this.state.optionText;
    },

    /**
     * @param  {object} event
     */
    _onKeyDown: function (event) {
        if (event.keyCode === ENTER_KEY_CODE && this._isValidInput()) {
            this._addOptionItem();
        }
    },
});

module.exports = SelectManager;