/**
 * Created by epotignano on 15/03/16.
 */
var Firebase = require('firebase');
var algoliasearch = require('algoliasearch');
var client = algoliasearch("HZI70BC07V", "b9b0de405259ebb0caa9fd491b44e0ea");
var _ = require('lodash');
var FireRef = require('../firebaseConf');

function initIndex(snapshot) {
    var _db = snapshot.val();
    _.forEach(_db, (_collectionObjects, _collectionName) => {
        var _objectsToIndex = [];
        var _index = client.initIndex(_collectionName);
        _.forEach(_collectionObjects, (_objectValue, _objectKey) => {
            _objectValue.objectID = _objectKey;
            _objectsToIndex.push(_objectValue);
        });
        _index.saveObjects(_objectsToIndex, (err, content) => {
            if(err) {
                throw err;
            }
            console.log('Firebase -- Algolia import done')
        })
    });
}

function addOrUpdateObject(dataSnapshot) {
    // Get Firebase object
    var firebaseObject = dataSnapshot.val();
    var _index = client.initIndex('users');
    // Specify Algolia's objectID using the Firebase object key
    firebaseObject.objectID = dataSnapshot.key();

    // Add or update object
    _index.saveObject(firebaseObject, (err, content) => {
        if(err) {
            throw err;
        }
        console.log('Firebase -- Algolia object saved')
    });
}


function removeObject(oldSnapshot) {
    var _index = client.initIndex('users');
    _index.deleteObject(oldSnapshot.key(), (err, content) => {
        if(err) {
            throw err;
        }
        console.log('Firebase -- Algolia deleted')
    })
}

exports.syncCollection = function(collectionName) {
    var _collection = new Firebase(FireRef  +  collectionName);
    _collection.on('child_added', addOrUpdateObject);
    _collection.on('child_changed', addOrUpdateObject);
    _collection.on('child_removed', removeObject);
};

var importAllDatabaseData = function() {
    var _fb = new Firebase(FireRef);
    _fb.on('value', initIndex);
};

exports.importExistingEntity = function(firebaseCollection, algoliaIndexName) {

};