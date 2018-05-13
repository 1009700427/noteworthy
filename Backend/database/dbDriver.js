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
    //collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        console.log("Found the following records");
        var result = false;
        console.log("docs: " + docs);
        console.log(typeof(docs));
        console.log("1: ", docs==={});
        console.log("2: ", docs===[]);
        console.log("3: ", docs.length);
        console.log(_username, _password);
        if(docs.length!=0)
        {
            console.log("set true");
            result = true;
        }
        callback && callback(result);
    });
}


module.exports.loginAuth = function(username, password, callback){
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