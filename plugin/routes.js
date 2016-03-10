(function (Module) {
    'use strict';

    var async      = require('async'),
        controller = require('./controller'),
        database   = require('./database'),
        nodebb     = require('./nodebb');

    var accountHelpers = nodebb.accountHelpers,
        helpers        = nodebb.helpers,
        routeHelpers   = nodebb.routesHelpers;

    Module.setup = function (params, callback) {
        var router      = params.router,
            middleware  = params.middleware,
            controllers = params.controllers,
            pluginUri   = '/admin/plugins/custom-fields',
            apiUri      = '/api' + pluginUri;

        // Acp page
        router.get(pluginUri, middleware.admin.buildHeader, Module.renderAdmin);
        router.get(apiUri, Module.renderAdmin);

        // Acp api
        router.get(apiUri + '/fields', Module.getFields);
        router.put(apiUri + '/fields', Module.updateField);
        router.put(apiUri + '/fields/:fieldId/swap', Module.swapFields);
        router.delete(apiUri + '/fields/:fieldId', Module.deleteField);

        // Client edit page
        routeHelpers.setupPageRoute(
            router, '/user/:userslug/edit/custom-fields',
            middleware, [middleware.checkGlobalPrivacySettings, middleware.checkAccountPermissions],
            Module.renderClient);

        callback();
    };

    Module.renderAdmin = function (req, res, next) {
        res.render(
            'admin/plugins/custom-fields', {}
        );
    };

    Module.renderClient = function (req, res, next) {
        async.waterfall([
            async.apply(accountHelpers.getUserDataByUserSlug, req.params.userslug, req.uid),
            function (userData, callback) {
                if (!userData) {
                    return callback(new Error('User ' + req.params.userslug + ' is not found'));
                }

                controller.getCustomFields(userData.uid, function (e, fields) {
                    if (e != null) {
                        return callback(e);
                    }

                    userData.title = '[[pages:account/edit, ' + userData.username + ']]';
                    userData.breadcrumbs = helpers.buildBreadcrumbs([
                        {text: userData.username, url: '/user/' + userData.userslug},
                        {text: '[[user:edit]]', url: '/user/' + userData.userslug + '/edit'},
                        {text: 'Custom Fields'}
                    ]);
                    userData.customFields = fields;

                    callback(null, userData);
                });
            }
        ], function (e, result) {
            if (e != null) {
                return res.render('500', {});
            }

            res.render('client/plugins/custom-fields-edit', result);
        });
    };

    var handleCriticalError = function (req, res, error) {
        return res.status(500).json(error);
    };

    //Public API
    Module.deleteField = function (req, res, next) {
        database.deleteField(req.params.fieldId, function (error) {
            if (error) {
                return handleCriticalError(req, res, error);
            }
            res.json({status: 'OK'});
        });
    };

    Module.getFields = function (req, res, next) {
        database.getFields(function (error, fields) {
            if (error) {
                return handleCriticalError(req, res, error);
            }
            res.json(fields);
        });
    };

    Module.swapFields = function (req, res, next) {
        //Returns same result as 'getFields'
        database.swapFields(req.params.fieldId, req.body.id, function (error, fields) {
            if (error) {
                return handleCriticalError(req, res, error);
            }
            res.json(fields);
        });
    };

    Module.updateField = function (req, res, next) {
        database.updateField(req.body.id, req.body.fieldKey, req.body.fieldName, function (error, field) {
            if (error) {
                return handleCriticalError(req, res, error);
            }
            res.json(field);
        });
    };

})(module.exports);