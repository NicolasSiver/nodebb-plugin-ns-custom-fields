var React                 = require('react'),
    ReactPropTypes        = React.PropTypes,
    Actions               = require('../actions/Actions'),
    Input                 = require('./fields/Input.react'),
    Select                = require('./fields/Select.react'),
    LinkedStateMixin      = require('react/lib/LinkedStateMixin'),

    ENTER_KEY_CODE        = 13,
    noSpecialCharsPattern = /[^\w]/gi,

    fields                = [
        {name: 'Input', type: 'input'},
        {name: 'Select', type: 'select'}
    ];

var FieldInput = React.createClass({
    mixins: [LinkedStateMixin],

    propTypes: {
        fieldKey : ReactPropTypes.string,
        fieldName: ReactPropTypes.string
    },

    getInitialState: function () {
        return {
            fieldKey  : this.props.fieldKey || '',
            fieldName : this.props.fieldName || '',
            fieldType : fields[0].type,
            fieldMeta : {},
            fieldValid: false
        };
    },

    render: function () {
        var del, self = this;

        function getFieldComponentByType(type) {
            switch (type) {
                case 'input':
                    return <Input meta={self.state.fieldMeta} onUpdate={self._fieldDidUpdate}/>;
                case 'select':
                    return <Select meta={self.state.fieldMeta} onUpdate={self._fieldDidUpdate}/>;
            }
        }

        function renderFieldTypes(option, index) {
            return <option value={option.type} key={index} label={option.name}>{option.name}</option>;
        }

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

                    <div className="form-group">
                        <label htmlFor="labelType">Field Type</label>
                        <select className="form-control" value={this.state.fieldType} id="labelType"
                                onChange={this._fieldTypeDidChange}>
                            {fields.map(renderFieldTypes)}
                        </select>
                    </div>

                    {getFieldComponentByType(this.state.fieldType)}

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

    _fieldDidUpdate: function (meta, valid) {
        this.setState({
            fieldValid: valid,
            fieldMeta : meta
        });
    },

    _fieldTypeDidChange: function (e) {
        this.setState({
            fieldType: e.currentTarget.value
        });
    },

    _isValid: function () {
        return !!this.state.fieldKey && !!this.state.fieldName && this.state.fieldValid;
    },

    _save: function () {
        Actions.createField(this.state.fieldKey.toLowerCase(), this.state.fieldName);
        this.replaceState(this.getInitialState());
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