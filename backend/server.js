const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const PORT = 3000

app.use(express.static('public'))

io.on("connection", (socket) => {

    socket.on('we rollin', (msg) => {
       console.log("we rollin'");
        io.emit('ttt', "we rollin' on id: "+msg);
    });

    io.emit('otto', "Hier ist Otto")
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected')
    });
})

app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/html/index.html'))
})

server.listen(PORT, () => {
    console.log('Server is running.')
})

// Kommentar

console.log("same" +
    "egs" +
    "rh" +
    "")