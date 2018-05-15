const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'noteworthyDB';

function findUser(_username, _password, db, callback){
    // Get the documents collection
    const collection = db.collection('users');
    // Find some documents
    collection.find({username: _username, password: _password}).toArray((err, docs) => {
        assert.equal(err, null);
        console.log("Found the following records");
        var result = {
            username: _username
        };
        if(docs.length==0)
        {
            result.id = -1;
            console.log("failed!");
        }
        else
        {
            result.id = docs[0].id;
            console.log("success!");
        }
        callback && callback(result);
    });
}

// handles user login
module.exports.loginAuth = (username, password, callback) => {
    // Use connect method to connect to the server
    MongoClient.connect(url, (err, client) => {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        findUser(username, password, db, (_result)=>{
            client.close();
            callback && callback(_result);
        });
    });
};

function findUserSize(_username, _password, db, callback){
    // Get the documents collection
    const collection = db.collection('users');
    collection.find().toArray((err, docs) => {
        assert.equal(err, null);
        let size = 0;
        if(docs!=undefined){
            size = docs.length;
        }
        callback && callback(size);
    });
}

function addUser(_username, _password, db, callback){
    // Get the documents collection
    const collection = db.collection('users');
    // Find some documents
    findUserSize(_username, _password, db, (size) => {
        collection.insert({username: _username, password: _password, id: parseInt(size+1)}, (err, docs) => {
            assert.equal(err, null);
            console.log("inserted new user!");
        });
    });
    callback && callback();
}

// handles user signup
module.exports.userSignup = (username, password, callback) => {
    // Use connect method to connect to the server
    MongoClient.connect(url, (err, client) => {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        addUser(username, password, db);
        callback && callback();
    });
};

function findDocumentSize(userID, db, callback){
    const collection = db.collection('users');
    collection.find({id: parseInt(userID)}).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(userID, typeof(userID));
        console.log(docs);
        let size = 0;
        console.log(docs[0].documents!=undefined);
        if(docs[0].documents!=undefined)
        {
            size = docs[0].documents.length;
        }
        callback && callback(size);
    });
}

function createNewFileHelper(userID,_docName, db) {
    // Get the documents collection
    const collection = db.collection('users');
    findDocumentSize(userID, db, (size) => {
        if(size==0){
            collection.update({id: parseInt(userID)}, {$set: {documents: [{docID: size+1, docName: _docName}]}}, (err, result)=>{
                assert.equal(err, null);
            });
        }
        else {
            collection.update({id: parseInt(userID)}, {$push: {documents: {docID: size+1, docName: _docName}}}, (err, result) => {
                assert.equal(err, null);
            });
        }
    });
}

// handles creating new file
module.exports.createNewFile = (userID, docName, callback) => {
    MongoClient.connect(url, (err, client) => {
       assert.equal(null, err);
       console.log("Connnected successfully to server");
       const db = client.db(dbName);
       createNewFileHelper(userID,docName, db);
       callback && callback();
    });
};