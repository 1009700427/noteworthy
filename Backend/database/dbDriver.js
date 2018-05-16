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

function createNewFileHelper(userID,_docName, db, callback) {
    // Get the documents collection
    const collection = db.collection('users');
    findDocumentSize(userID, db, (size) => {
        if(size==0){
            collection.update({id: parseInt(userID)}, {$set: {documents: [{docID: size+1, docName: _docName, plainText: ""}]}}, (err, result)=>{
                assert.equal(err, null);
            });
        }
        else {
            collection.update({id: parseInt(userID)}, {$push: {documents: {docID: size+1, docName: _docName, plainText: ""}}}, (err, result) => {
                assert.equal(err, null);
            });
        }
        const response = {
            docID: size+1
        };
        console.log("docID: "+(size+1));
        callback && callback(response);
    });
}

// handles creating new file
module.exports.createNewFile = (userID, docName, callback) => {
    MongoClient.connect(url, (err, client) => {
       assert.equal(null, err);
       console.log("Connnected successfully to server");
       const db = client.db(dbName);
       createNewFileHelper(userID,docName, db, ((docID)=>{
           callback && callback(docID);
       }));
    });
};

function getDocumentsHelper(_userID, db, callback){
    // Get the documents collection
    const collection = db.collection('users');
    collection.find({id: parseInt(_userID)}).toArray((err, docs)=>{
        assert.equal(err, null);
        let documents = [];
        if(docs[0].documents!=undefined){
            documents = docs[0].documents;
        }
        callback && callback(documents);
    });
}

// gets the documents of the designated user
module.exports.getDocuments = (userID, callback) => {
    MongoClient.connect(url, (err, client)=>{
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        getDocumentsHelper(userID, db, (docs)=>{
            callback && callback(docs);
        });
    });
};

function savePlainTextHelper(db, _plainText, _userID, _documentID){
    const collection = db.collection('users');
    console.log(_userID, _documentID);
    console.log(typeof(_userID), typeof(_documentID));
    collection.update({"id": parseInt(_userID), "documents.docID": parseInt(_documentID)}, {$set: {"documents.$.plainText": _plainText}}, (err, result)=>{
            assert.equal(err, null);
        });
}

// saves the plain text to database
module.exports.savePlainText = (plainText, userID, documentID, callback) => {
    MongoClient.connect(url, (err, client)=>{
        assert.equal(err, null);
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        console.log(plainText);
        savePlainTextHelper(db, plainText, userID, documentID);
        callback && callback();
    });
};