(function (Plugin) {
    'use strict';

    var _         = require('underscore'),
        path      = require('path'),
        winston   = require('winston'),
        nconf     = require('./app/nodebb').nconf,

        routes    = require('./app/routes'),
        sockets   = require('./app/sockets'),

        constants = require('./app/constants'),

        settings  = null,
        namespace = 'ns:custom_fields',
        logger    = null;

    winston.loggers.add(constants.LOGGER, {
        console: {
            colorize : true,
            timestamp: function () {
                var date = new Date();
                return date.getDate() + '/' + (date.getMonth() + 1) + ' ' + date.toTimeString().substr(0, 5) + ' [' + global.process.pid + ']';
            },
            level    : global.env === 'production' ? 'info' : 'verbose',
            label    : 'plugins/custom-fields'
        }
    });

    logger = winston.loggers.get(constants.LOGGER);

    function changeTemplates() {
        var fs       = require('fs-extra'),
            editPath = path.join(nconf.get('base_dir'), 'public/templates/account/edit.tpl');

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
                logger.log('verbose', 'Register API endpoints');

                routes.setup(params, function () {
                    sockets.setup(callback);
                });
                //emitter.on('templates:compiled', changeTemplates);
            }
        }
    };


})(module.exports);