var React          = require('react'),
    ReactPropTypes = React.PropTypes;

var SelectManager = React.createClass({
    propTypes: {},

    render: function () {
        return (
            <div>
                <p>Create Select Options</p>

                <div className="row">
                    <div className="col-md-2">
                        <input
                            type="text"
                            maxlength="3"
                            className="form-control"
                            placeholder="Id"/>
                    </div>
                    <div className="col-md-8">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Label"/>
                    </div>
                    <div className="col-md-2">
                        <button
                            className="btn btn-success btn-block"
                            type="button"><i className="fa fa-plus fa-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = SelectManager;