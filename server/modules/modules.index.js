/**
 * Created by epotignano on 19/03/16.
 */
var Config = require('../../config');
exports.requireApplicationModules= function() {
    /** We can add and delete modules for each particular case as we want! **/
    var _modules = Config.get('/applicationModules');
    var _modulesKey = Object.keys(_modules);
    _modulesKey.map(function(key) {
        require('./' + _modules[key])
    })
}