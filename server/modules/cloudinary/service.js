/**
 * Created by epotignano on 15/03/16.
 */

var conf = require('./config').configuration.cloudinaryConf;
var cloudinary = require('cloudinary');
var q = require('q');
var Firebase = require('firebase');
var FireRef = require('../firebaseConf').firebaseConfig.FirebaseRef;
var fs = require('fs');

/** init **/
cloudinary.config(conf);

var fileUploadResult = function(err, result) {
    console.log(err);
    if(err) { throw err}
    console.log(result)

};

exports.upload =function(imageBinary) {
    var _base64String = new Buffer(imageBinary).toString('base64');
    var _image = 'data:image/png;base64,' +_base64String;
    cloudinary.uploader.upload(_image, function(result){
        console.log('some result is here!')
        console.log(result);
    })
};
