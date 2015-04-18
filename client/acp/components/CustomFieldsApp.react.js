var React = require('react');

var CustomFieldsApp = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-lg-6">
                    <div className="panel panel-default">
                        <div className="panel-heading"><i className="fa fa-plus-square" /> Custom Fields</div>
                        <div className="panel-body" />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="panel panel-default">
                        <div className="panel-body" />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = CustomFieldsApp;