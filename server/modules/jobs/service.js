/**
 * Created by epotignano on 17/03/16.
 */
var Firebase = require('firebase');
var FireRef = require('../firebaseConf').firebaseConfig.FirebaseRef;
var JOB_TYPES = require('./config').configuration.JOB_TYPES;
var images = require('../cloudinary/service');

function JobsWatcher() {
    console.log('Watcher watching');
    var _jobs = new Firebase(FireRef + '/jobs');
    /** Process Jobs **/

    _jobs.on('child_added', function (snapshot) {
        var _job = snapshot.val();
        switch(_job.jobType) {
            case(JOB_TYPES.IMAGE_UPLOAD):
                images.upload(_job.file, _job.collection, _job.entityId)
        }
    })
}

/*Activate this watcher */
JobsWatcher();