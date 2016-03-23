
var Queue = require('firebase-queue'),
    requireDir = require('require-dir'),
    Firebase = require('firebase');

// The location of the Queue - can be any Firebase Location
var ref = new Firebase('https://' + process.env.FB_NAME + '.firebaseio.com/');
// Creates the Queue
var options = {
    specId: 'sanitize_message',

};

var jobs = requireDir('./jobs');

var queueRef = ref.child('queue');
queueRef.child('specs').set({
    sanitize_message: {
        in_progress_state: "sanitize_message_in_progress",
        finished_state: "sanitize_message_finished"
    },
    fanout_message: {
        start_state: "sanitize_message_finished",
        in_progress_state: "fanout_message_in_progress",
        error_state: "fanout_message_failed",
        retries: 3
    }
});

// Add tasks onto the queue
var taskNumber = 0;
setInterval(function() {
    queueRef.child('tasks').push({
        message: 'Hello Firebase',
        name: "¨Potignanoさん"
    });
}, 1000);

var sanitizeQueue = new Queue(queueRef, options, function(data, progress, resolve, reject) {
    // Read and process task data
    console.log(data);
    console.log(jobs);

    // Do some work
    var percentageComplete = 0;
    var interval = setInterval(function() {
        percentageComplete += 20;
        if (percentageComplete >= 100) {
            clearInterval(interval);
        } else {
            progress(percentageComplete);
        }
    }, 1000);

    // Finish the task
    setTimeout(function() {
        resolve();
    }, 5000);
});

process.on('SIGINT', function() {
    console.log('Starting queue shutdown');
    sanitizeQueue.shutdown().then(function() {
        console.log('Finished queue shutdown');
        process.exit(0);
    });
});