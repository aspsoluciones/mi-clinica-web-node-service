/**
 * Created by epotignano on 15/03/16.
 */

var conf = require('./config').configuration.cloudinaryConf;
var cloudinary = require('cloudinary');
var q = require('q');
var Firebase = require('firebase');
var FireRef = require('../firebaseConf').firebaseConfig.FirebaseRef;
var fs = require('fs');
var btoa = require('btoa');

/** init **/
cloudinary.config(conf);

var fileUploadResult = function(err, result) {
    console.log(err);
    if(err) { throw err}
    console.log(result)

};

exports.upload =function(imageBinary, collection, entityRef, saveinKey) {
    var _uploadPromise = q.defer();
    var _base64String = btoa(imageBinary);
    _base64String = 'data:image/png;base64,' + _base64String;
    cloudinary.uploader.upload(_base64String, function(result){
        if(!result.error) {
            var _entityInstance = new Firebase(FireRef + '/' + collection + '/' + entityRef);
            _entityInstance.update({
                [saveinKey] : result
            })
        };
        _entityInstance.child('doneJobs').push({
            type: 'IMAGE_UPLOAD',
            key: saveinKey,
            error: !!result.error,
            processed: false
        });
    })

};
