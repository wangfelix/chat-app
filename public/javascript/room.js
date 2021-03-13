const socket = io()

let keys = location.search.substr(1).split("&")

console.log("rooms.js connected")

socket.on('connect', function(){
    console.log(socket.id);
    const roomId = window.location.pathname.substr(1).split("/")[0]
    const userId = window.location.pathname.substr(1).split("/")[1]
    socket.emit('joinRoom', {roomId, userId})
})

socket.on("room joined", ({roomName, userName}) => {

    //TEST--
    console.log(socket.id);
    console.log("room joined")
    console.log("Username: " + userName)
    console.log("Roomname: " + roomName)
    //--END TEST

    document.getElementById('room-name').innerHTML = roomName
    document.getElementById('user-name').innerHTML += userName
    document.getElementById('share-room-link').innerHTML = "" + window.location.host + "/" +window.location.pathname.substr(1).split("/")[0]


})