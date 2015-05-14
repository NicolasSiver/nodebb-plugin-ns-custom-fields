var React          = require('react'),
    ReactPropTypes = React.PropTypes;

var Input = React.createClass({
    propTypes: {
        meta    : ReactPropTypes.object.isRequired,
        onUpdate: ReactPropTypes.func.isRequired
    },

    componentDidMount: function () {
        //Prompt is optional, Input is valid
        this.props.onUpdate({prompt: this.props.meta.prompt}, true);
    },

    render: function () {
        return (
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
        );
    },

    _promptDidChange: function (e) {
        this.props.onUpdate({
            prompt: e.currentTarget.value
        }, true);
    }
});

module.exports = Input;