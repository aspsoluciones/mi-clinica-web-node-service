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

exports.uploadVideo = function(videoBinary, collection, entityRef, saveinKey) {

}
