var express = require('express');
var app = express();
var server = require('http').Server(app);
var path    = require("path");
//expecting an http server
const io = require('socket.io')(server);
var port = process.env.PORT || 3000;


io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

app.use(express.static(__dirname + '/../'));



server.listen(port, function(){
    console.log('listening on *:' + port);
});
