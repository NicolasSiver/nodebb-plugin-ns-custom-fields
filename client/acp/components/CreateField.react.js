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
            <div className="panel panel-default">
                <div className="panel-heading"><i className="fa fa-plus-square"/> Create Field</div>
                <div className="panel-body">

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="labelKey">Key</label>
                                <input
                                    id="labelKey"
                                    type="text"
                                    className="form-control field-lower"
                                    onBlur={this._validateSpecialChars}
                                    valueLink={this.linkState('fieldKey')}
                                    placeholder="Field Key (Ex: gender)"/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="labelName">Name</label>
                                <input
                                    id="labelName"
                                    type="text"
                                    className="form-control"
                                    valueLink={this.linkState('fieldName')}
                                    placeholder="Field Name (Ex: Gender)"
                                    onKeyDown={this._onKeyDown}
                                    value={this.state.value}/>
                            </div>
                        </div>
                    </div>

                    <button
                        className="btn btn-success"
                        disabled={this._isValid() ? '' : 'disabled'}
                        onClick={this._save}
                        type="button">Create Field
                    </button>
                </div>
            </div>
        );
    },

    _isValid: function () {
        return !!this.state.fieldKey && !!this.state.fieldName;
    },

    _save: function () {
        Actions.createField(this.state.fieldKey.toLowerCase(), this.state.fieldName);
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