var app = require('express')();
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

// Example route
app.get('/', function (req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname+"/../index.html"));
});


server.listen(port, function(){
    console.log('listening on *:' + port);
});
