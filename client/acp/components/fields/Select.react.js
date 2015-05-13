var React          = require('react'),
    ReactPropTypes = React.PropTypes;

var Select = React.createClass({
    propTypes: {},

    render: function () {
        return (
            <div className="form-group">
                <label htmlFor="labelPrompt">Prompt message</label>
                <input
                    id="labelPrompt"
                    type="text"
                    className="form-control"
                    placeholder="Message"/>
            </div>
        );
    }
});

module.exports = Select;