(function (Plugin) {
    'use strict';

    var async = require('async');

    var routes   = require('./routes'),
        sockets  = require('./sockets'),
        filters  = require('./filters'),
        settings = require('./settings'),
        logger   = require('./logger');

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
            }
        }
    };


})(module.exports);
