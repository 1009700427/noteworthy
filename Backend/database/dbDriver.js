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
        var result = false;
        if(docs.length!=0)
        {
            result = true;
        }
        callback && callback(result);
    });
}


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

function addUser(_username, _password, db, callback){
    // Get the documents collection
    const collection = db.collection('users');
    // Find some documents
    collection.insert({username: _username, password: _password}, (err, docs) => {
        assert.equal(err, null);
        console.log("inserted new user!");
    });
}

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