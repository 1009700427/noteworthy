var express = require('express');
var app = express();
var server = require('http').Server(app);
var path    = require("path");
//expecting an http server
var port = process.env.PORT || 3000;
const dbDriver = require('./database/dbDriver');

app.use(express.static(__dirname + '/../'));

// performs login authentication
app.get('/loginAuth', (req, res)=>{
    dbDriver.loginAuth(req.query.username, req.query.password, (result) => {
        res.send(result);
    });
});

// performs user sign up
app.get('/signup', (req, res) => {
    dbDriver.userSignup(req.query.username, req.query.password, () => {
        res.send(true);
    });
});

// creates a new file
app.get('/createNewFile', (req, res) => {
    dbDriver.createNewFile(req.query.userID, req.query.docName, (docID)=>{
        res.send(docID);
    });
});

// gets all documents of the designated user
app.get('/getDocs', (req, res)=>{
    dbDriver.getDocuments(req.query.userID, (docs) => {
        console.log("docs:  " + docs);
        res.send(docs);
    });
});

// saves document plain text to database
app.get('/saveText', (req, res)=>{
    dbDriver.saveText(req.query.plainText, req.query.userID, req.query.documentID, req.query.styledText, ()=>{
        res.send(true);
    });
});

// finds the document given the docID
app.get('/findDoc', (req, res)=>{
    dbDriver.findDoc(req.query.docID, (doc)=>{
        res.send(doc);
    })
});

server.listen(port, function(){
    console.log('listening on *:' + port);
});


const { sockets } = require('./Sockets');

const io = require('socket.io')(server);

sockets(io);