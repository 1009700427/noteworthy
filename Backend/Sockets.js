module.exports = {
    sockets: (io) => {
        io.on('connect', (socket) => {
            console.log("made socket connection!");
            // handles user joining
            socket.on('join', ({docID}) => {
                if(io.sockets.adapter.rooms[docID]
                    && io.sockets.adapter.rooms.length >= 6){
                    socket.emit('roomFull');
                }
                else {
                    socket.join(docID);
                    console.log('room joined', docID);
                    // now saves the room name in the socket object
                    socket.roomName = docID;

                    // emits the user joined message
                    socket.broadcast.to(docID).emit('userJoined');
                }
            });
            // handles document change and broadcasts the new document data
            socket.on('documentChange', (documentData) => {
                socket.broadcast.to(socket.roomName).emit('documentChange', documentData);
            });
        });
    }
};