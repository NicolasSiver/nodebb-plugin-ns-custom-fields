var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    Actions        = require('../actions/Actions'),

    ENTER_KEY_CODE = 13;

var FieldInput = React.createClass({
    propTypes: {
        placeholder: ReactPropTypes.string,
        value      : ReactPropTypes.string
    },

    getInitialState: function () {
        return {
            value: this.props.value || ''
        };
    },

    render: function () {
        return (
            <input
                placeholder={this.props.placeholder}
                onBlur={this._save}
                onChange={this._onChange}
                onKeyDown={this._onKeyDown}
                value={this.state.value}
                />
        );
    },

    _save: function () {
        Actions.createField('someKey', this.state.value);
        this.setState({
            value: ''
        });
    },

    /**
     * @param {object} event
     */
    _onChange: function (event) {
        this.setState({
            value: event.target.value
        });
    },

    /**
     * @param  {object} event
     */
    _onKeyDown: function (event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this._save();
        }
    }
});

module.exports = FieldInput;