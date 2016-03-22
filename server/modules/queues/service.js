
var Queue = require('firebase-queue'),
    Firebase = require('firebase');

// The location of the Queue - can be any Firebase Location
var ref = new Firebase('https://' + process.env.FB_NAME + '.firebaseio.com/');
// Creates the Queue
var options = {
    specId: 'task_1',
    numWorkers: 10
};

var queueRef = ref.child('queue');
queueRef.child('specs').set({
    task_1: {
        in_progress_state: 'task_1_in_progress',
        timeout: 10000
    }
});

// Add tasks onto the queue
var taskNumber = 0;
setInterval(function() {
    queueRef.child('tasks').push({
        taskNumber: ++taskNumber
    });
}, 1000);

var queue = new Queue(queueRef, options, function(data, progress, resolve, reject) {
    // Read and process task data
    console.log(data);

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