'use strict';

var _         = require('underscore'),
    path      = require('path'),
    winston   = module.parent.require('winston'),
    meta      = module.parent.require('./meta'),

    settings  = null,
    namespace = 'ns:custom_fields';

(function (Plugin) {
    Plugin.hooks = {
        filters: {
            menu: function (custom_header, callback) {
                custom_header.plugins.push({
                    route: '/plugins/custom-fields',
                    icon : 'fa-plus-square',
                    name : 'Custom Fields'
                });
                callback(null, custom_header);
            }
        },
        statics: {
            load: function (params, callback) {
                var router      = params.router,
                    middleware  = params.middleware,
                    controllers = params.controllers;

                meta.settings.get(namespace, function (err, config) {
                    if (err) {
                        winston.warn('[' + namespace + '] Error has been occurred! There is no configuration.');
                        return callback(err);
                    }

                    settings = config;

                    router.get('/admin/plugins/custom-fields', middleware.applyCSRF, middleware.admin.buildHeader, Plugin.renderAdmin);
                    router.get('/api/admin/plugins/custom-fields', middleware.applyCSRF, Plugin.renderAdmin);

                    callback();
                });
            }
        }
    };

    Plugin.renderAdmin = function (req, res, next) {
        res.render(
            'admin/plugins/custom-fields',
            {
                settings: settings || {}
            }
        );
    };

})(module.exports);