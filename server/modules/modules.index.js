/**
 * Created by epotignano on 19/03/16.
 */
var retrieveApplicationModules = function() {
    /** We can add and delete modules for each particular case as we want! **/
    if(process.env.NODE_ENV = 'development') {
        require('./elasticsearch-firebase/service');
    } else {
        require('./elasticsearch-firebase/service');
    }
}

retrieveApplicationModules();