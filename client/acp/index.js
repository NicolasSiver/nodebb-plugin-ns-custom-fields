define('admin/plugins/custom-fields', [], function () {
    return {
        init: function () {
            var React           = require('react'),
                ReactDom        = require('react-dom'),
                CustomFieldsApp = require('./components/CustomFieldsApp.react');

            ReactDom.render(
                <CustomFieldsApp />,
                document.getElementById('manageFieldsApp')
            );
        }
    };
});
