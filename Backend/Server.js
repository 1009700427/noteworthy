var app = require('express')();
var server = require('http').Server(app);

//expecting an http server
const io = require('socket.io')(server);

io.on('connection', (socket));