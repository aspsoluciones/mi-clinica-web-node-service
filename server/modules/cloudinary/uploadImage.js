/**
 * Created by epotignano on 21/03/16.
 */
//

module.exports =  function(imageBinary, collection, entityRef, saveInKey) {
    var _base64String = btoa(imageBinary);
    _base64String = 'data:image/png;base64,' + _base64String;
    cloudinary.uploader.upload(_base64String, function(result){
        var _entityInstance = new Firebase(FireRef + '/' + collection + '/' + entityRef);
        if(!result.error) {
            _entityInstance.update({
                [saveInKey] : result
            })
        };
        _entityInstance.child('doneJobs').push({
            type: 'IMAGE_UPLOAD',
            key: saveInKey,
            error: !!result.error,
            processed: false
        });
    })

};