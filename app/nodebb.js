(function (Module, NodeBB) {
    'use strict';

    Module.exports = {
        adminSockets : NodeBB.require('./src/socket.io/admin').plugins,
        db           : NodeBB.require('./src/database'),
        meta         : NodeBB.require('./src/meta'),
        pluginSockets: NodeBB.require('./src/socket.io/plugins'),
        postTools    : NodeBB.require('./src/postTools'),
        settings     : NodeBB.require('./src/settings'),
        socketIndex  : NodeBB.require('./src/socket.io/index'),
        topics       : NodeBB.require('./src/topics'),
        user         : NodeBB.require('./src/user')
    };

})(module, require.main);