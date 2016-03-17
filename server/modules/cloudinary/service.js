/**
 * Created by epotignano on 15/03/16.
 */

var conf = require('./config').configuration;
var cloudinary = require('cloudinary');
var q = require('q');
var Firebase = require('firebase');
var FireRef = require('../firebaseConf').firebaseConfig.FirebaseRef;

/** init **/
cloudinary.config(conf);

var fileUploadResult = function(err, result) {
    console.log(err);
    if(err) { throw err}
    console.log(result)

};

exports.imageUpload =function(snapshotValue) {
    cloudinary.uploader(snapshotValue.file, fileUploadResult)
};
