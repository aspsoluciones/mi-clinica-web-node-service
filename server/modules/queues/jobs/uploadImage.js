/**
 * Created by epotignano on 21/03/16.
 */
//

var cloudinary = require('cloudinary');
var btoa = require('btoa');
var Firebase = require('firebase');

/** init cloudinary configuration **/
cloudinary.config(process.env.CLOUDINARY);

module.exports =  function(data, progress, resolve, reject) {
    var _base64String = btoa(data.file);
    _base64String = 'data:image/png;base64,' + _base64String;
    cloudinary.uploader.upload(_base64String, function(result){
        var _entityInstance = new Firebase(process.env.FIREBASE_URL + '/' + data.collection + '/' + data.entityId);
        if(!result.error) {
            _entityInstance.update({
                [data.saveInKey] : result
            })
            resolve('Image uploaded without problems')
        } else {
            reject('Error uploading image to Cloudinary');
        }
        /*_entityInstance.child('doneJobs').push({
         type: 'IMAGE_UPLOAD',
         key: saveInKey,
         error: !!result.error,
         processed: false
         });*/
    })

};