(function (Plugin) {
    'use strict';

    var async     = require('async'),
        _         = require('underscore'),
        path      = require('path'),

        nconf     = require('./nodebb').nconf,
        routes    = require('./routes'),
        sockets   = require('./sockets'),
        constants = require('./constants'),
        filters   = require('./filters'),
        settings  = require('./settings'),
        logger    = require('./logger');

    function changeTemplates() {
        var fs       = require('fs-extra'),
            editPath = path.join(nconf.get('base_dir'), 'public/templates/account/edit.tpl');

        fs.copySync(path.join(__dirname, './public/templates/account/edit.tpl'), editPath);
    }

    //NodeBB list of Hooks: https://github.com/NodeBB/NodeBB/wiki/Hooks
    Plugin.hooks = {
        filters: filters,
        statics: {
            load: function (params, callback) {
                async.series([
                    settings.init,
                    async.apply(routes.setup, params),
                    sockets.setup
                ], function (error) {
                    if (error) {
                        return callback(error);
                    }
                    logger.log('verbose', 'Plugin is initiated successfully');
                    callback(null);
                });
                //emitter.on('templates:compiled', changeTemplates);
            }
        }
    };


})(module.exports);
