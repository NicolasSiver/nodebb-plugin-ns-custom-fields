var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    SelectManager  = require('./SelectManager.react');

var Select = React.createClass({
    propTypes: {},

    render: function () {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="labelPrompt">Prompt message</label>
                    <input
                        id="labelPrompt"
                        type="text"
                        className="form-control"
                        placeholder="Message"/>
                </div>

                <SelectManager />
            </div>
        );
    }
});

module.exports = Select;