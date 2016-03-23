
var Queue = require('firebase-queue'),
    requireDir = require('require-dir'),
    Firebase = require('firebase');

// The location of the Queue - can be any Firebase Location
var ref = new Firebase('https://' + process.env.FB_NAME + '.firebaseio.com/');
// Creates the Queue
var queueOptions = {
    'specId': 'def',
    'numWorkers': 10,
};


var jobs = requireDir('./jobs');

var queueRef = ref.child('queue');

var queue = new Queue(queueRef, queueOptions, function(data, progress, resolve, reject) {
    // Read and process task data
    var _spec = jobs[data.jobType];
    if(_spec) {
        _spec(data, progress, resolve, reject);
    } else {
        reject('Job spec unknown or unspecified');
    }
});

process.on('SIGINT', function() {
    console.log('Starting queue shutdown');
    queue.shutdown().then(function() {
        console.log('Finished queue shutdown');
        process.exit(0);
    });
});