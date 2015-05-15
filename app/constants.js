function define(name, value) {
    Object.defineProperty(exports, name, {
        value     : value,
        enumerable: true
    });
}

define('LOGGER', 'CUSTOM_FIELDS');
define('NAMESPACE', 'ns:custom_fields');
define('SOCKETS', 'ns-custom-fields');