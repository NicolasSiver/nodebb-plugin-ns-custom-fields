(function (Plugin) {
    'use strict';

    var _         = require('underscore'),
        path      = require('path'),
        winston   = module.parent.require('winston'),
        meta      = module.parent.require('./meta'),
        routes    = require('./app/routes'),
        sockets   = require('./app/sockets'),

        emitter   = module.parent.require('./emitter'),

        settings  = null,
        namespace = 'ns:custom_fields';

    function changeTemplates() {
        var fs       = require('fs-extra'),
            path     = require('path'),
            nconf    = module.parent.require('nconf'),
            editPath = path.join(nconf.get('base_dir'), 'public/templates/account/edit.tpl');

        winston.log('debug', 'Template %s will be replaces with a template for custom fields');

        fs.copySync(path.join(__dirname, './public/templates/account/edit.tpl'), editPath);
    }

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
                routes.setup(params, function () {
                    sockets.setup(callback);
                });
                //emitter.on('templates:compiled', changeTemplates);
            }
        }
    };


})(module.exports);