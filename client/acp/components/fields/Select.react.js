var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    SelectManager  = require('./SelectManager.react');

var Select = React.createClass({
    propTypes: {
        meta    : ReactPropTypes.object.isRequired,
        onUpdate: ReactPropTypes.func.isRequired
    },

    componentDidMount: function () {
        this._update(this.props.meta.prompt, this.props.meta.options);
    },

    render: function () {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="labelPrompt">Prompt message</label>
                    <input
                        id="labelPrompt"
                        type="text"
                        className="form-control"
                        value={this.props.meta.prompt}
                        onChange={this._promptDidChange}
                        placeholder="Message"/>
                </div>

                <SelectManager
                    options={this.props.meta.options || []}
                    onUpdate={this._optionsDidChange}/>
            </div>
        );
    },

    _optionsDidChange: function (options) {
        this._update(this.props.meta.prompt, options);
    },

    _promptDidChange: function (e) {
        this._update(e.currentTarget.value, this.props.meta.options);
    },

    _update: function (prompt, options) {
        this.props.onUpdate({
                prompt : prompt,
                options: options
            },
            //There is no point in Select with zero or one option
            options && options.length >= 2);
    }
});

module.exports = Select;