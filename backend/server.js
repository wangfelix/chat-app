const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const ChatApp = require('./application/chatapp')

const PORT = 3000
app.use(express.static('public'))
let chatApp = new ChatApp()

io.on("connection", (socket) => {
    console.log("socket.id: ")
    console.log(socket.id)

    socket.on('createRoom', ({roomName, userName}) => {

       console.log("we rollin': " + roomName);
       const roomId = chatApp.createRoom(roomName);
       const userId = chatApp.createUserToRoom(userName, roomId);
       io.emit("room created", {roomId, userId})
    });

    socket.on('createUser', ({roomId, userName}) => {

        const userId = chatApp.createUserToRoom(userName, roomId);
        io.emit("user created", userId)
    });

    socket.on('joinRoom', ({roomId, userId}) => {

        //TODO Check if the given userId corresponds to an existing user
        if(!chatApp.hasRoom(roomId)) {
            //TODO What happens when the url room id doesnt correspond to a room
            console.log("ERROR: Room doesn't exist")
        } else {
            const roomName = chatApp.getRoomName(roomId);
            const userName = chatApp.getUserName(userId, roomId);
            console.log(userName + " is joining Room : " + roomName + " : " + roomId);
            socket.join(roomId);
            io.in(roomId).emit("room joined", {roomName, userName});
            //io.emit("room joined", {roomName, userName})
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected')
    });
})





app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/html/index.html'))
})

/*
 * Users call this URL to join a room. This route takes them to the page, where they choose a username before joining.
 */
app.get('/:room_id', (req, res) => {
    res.sendFile(path.resolve('./public/html/joinroom.html'))
})

app.get('/:room_id/:user_id', (req, res) => {
    res.sendFile(path.resolve('./public/html/room.html'))
})

server.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})