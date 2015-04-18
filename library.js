'use strict';

var _         = require('underscore'),
    path      = require('path'),
    winston   = module.parent.require('winston'),
    meta      = module.parent.require('./meta'),
    routes    = require('./app/routes'),

    settings  = null,
    namespace = 'ns:custom_fields';

(function (Plugin) {
    //NodeBB list of Hooks: https://github.com/NodeBB/NodeBB/wiki/Hooks
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
                routes.setup(params, callback);
            }
        }
    };


})(module.exports);