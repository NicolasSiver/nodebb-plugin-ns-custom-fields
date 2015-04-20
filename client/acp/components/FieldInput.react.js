var React                 = require('react'),
    ReactPropTypes        = React.PropTypes,
    Actions               = require('../actions/Actions'),
    LinkedStateMixin      = require('react/lib/LinkedStateMixin'),

    ENTER_KEY_CODE        = 13,
    noSpecialCharsPattern = /[^\w]/gi;

var FieldInput = React.createClass({
    mixins: [LinkedStateMixin],

    propTypes: {
        fieldKey : ReactPropTypes.string,
        fieldName: ReactPropTypes.string
    },

    getInitialState: function () {
        return {
            fieldKey : this.props.fieldKey || '',
            fieldName: this.props.fieldName || ''
        };
    },

    render: function () {
        var del;
        return (
            <div className="row">
                <div className="col-lg-5 col-lg-offset-1">
                    <input
                        type="text"
                        className="form-control field-lower"
                        onBlur={this._validateSpecialChars}
                        valueLink={this.linkState('fieldKey')}
                        placeholder="Field Key (Ex: gender)"/>
                </div>
                <div className="col-lg-6">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            valueLink={this.linkState('fieldName')}
                            placeholder="Field Name (Ex: Gender)"
                            onKeyDown={this._onKeyDown}
                            value={this.state.value}/>
                        <span className="input-group-btn">
                            <button
                                className="btn btn-success"
                                disabled={this._isValid() ? '' : 'disabled'}
                                onClick={this._save}
                                type="button">Add
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        );
    },

    _isValid: function () {
        return !!this.state.fieldKey && !!this.state.fieldName;
    },

    _save: function () {
        Actions.createField(this.state.fieldKey, this.state.fieldName);
        this.setState({
            fieldKey : '',
            fieldName: ''
        });
    },

    /**
     * @param  {object} event
     */
    _onKeyDown: function (event) {
        if (event.keyCode === ENTER_KEY_CODE && this._isValid()) {
            this._save();
        }
    },

    _validateSpecialChars: function (event) {
        var keyValue = event.target.value || '';
        this.setState({
            fieldKey: keyValue.replace(noSpecialCharsPattern, '')
        });
    }
});

module.exports = FieldInput;