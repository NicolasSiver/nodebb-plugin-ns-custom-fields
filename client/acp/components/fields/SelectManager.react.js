var React          = require('react'),
    ReactPropTypes = React.PropTypes;

var SelectManager = React.createClass({
    propTypes: {},

    getInitialState: function () {
        return {
            optionId  : this.props.optionId || '',
            optionText: this.props.optionText || '',
            options   : []
        };
    },

    render: function () {
        return (
            <div className="options-manager">
                <p>Create Select Options</p>

                <ul className="options-list">
                </ul>

                <div className="row">
                    <div className="col-md-2">
                        <input
                            type="text"
                            maxLength="3"
                            className="form-control"
                            value={this.state.optionId}
                            onChange={this._inputDidChange.bind(null, 'optionId')}
                            placeholder="Id"/>
                    </div>
                    <div className="col-md-8">
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.optionText}
                            onChange={this._inputDidChange.bind(null, 'optionText')}
                            placeholder="Label"/>
                    </div>
                    <div className="col-md-2">
                        <button
                            className="btn btn-success btn-block"
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
        this.setState({
            options   : this.state.options.concat([{id: this.state.optionId, text: this.state.optionText}]),
            optionId  : '',
            optionText: ''
        });
    },

    _inputDidChange: function (key, e) {
        var update = {};
        update[key] = e.currentTarget.value;
        this.setState(update);
    },

    _isValidInput: function () {
        return this.state.optionId && this.state.optionText;
    }
});

module.exports = SelectManager;