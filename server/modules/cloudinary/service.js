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

exports.upload =function(imageBinary) {
    var _base64String = btoa(imageBinary);
    _base64String = 'data:image/png;base64,' + _base64String;
    cloudinary.uploader.upload(_base64String, function(result){
        console.log('some result is here!')
        console.log(result);
    })
};
