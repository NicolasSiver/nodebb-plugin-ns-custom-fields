(function (Module) {
    'use strict';

    Module.setup = function (params, callback) {
        var router      = params.router,
            middleware  = params.middleware,
            controllers = params.controllers,
            pluginUri   = '/admin/plugins/custom-fields',
            apiUri      = '/api' + pluginUri;

        router.get(pluginUri, middleware.admin.buildHeader, Module.renderAdmin);
        router.get(apiUri, Module.renderAdmin);

        router.get(apiUri + '/fields', Module.getFields);
        router.post(apiUri + '/fields', Module.createField);
        router.put(apiUri + '/fields', Module.updateField);
        router.put(apiUri + '/fields/:fieldId/swap', Module.swapFields);

        callback();
    };

    Module.renderAdmin = function (req, res, next) {
        res.render(
            'admin/plugins/custom-fields', {}
        );
    };

    //Public API
    Module.createField = function (req, res, next) {

    };

    Module.getFields = function (req, res, next) {

    };

    Module.swapFields = function (req, res, next) {

    };

    Module.updateField = function (req, res, next) {

    };

})(module.exports);