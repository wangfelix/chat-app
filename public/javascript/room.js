const socket = io()
const roomId = window.location.pathname.substr(1).split("/")[0]
const userId = window.location.pathname.substr(1).split("/")[1]

let keys = location.search.substr(1).split("&")

console.log("rooms.js connected")

socket.on('connect', function(){
//    console.log(socket.id);
    socket.emit('joinRoom', {roomId, userId})
})

socket.on("room joined", ({roomName, userName}) => {

    //TEST--
    console.log(socket.id);
    console.log("room joined")
    console.log("Username: " + userName)
    console.log("Roomname: " + roomName)
    //--END TEST

    this.userName = userName
    document.getElementById('room-name').innerHTML = roomName
    document.getElementById('user-name').innerHTML += userName
    document.getElementById('share-room-link').innerHTML = "" + window.location.host + "/" +window.location.pathname.substr(1).split("/")[0]


})

function leaveRoom() {

    //TODO Remove User Obj from Userslist in Room Obj
    socket.emit('leaveRoom', {"roomId": roomId, "userId": userId})

    window.location.href = "/"
}
socket.on("userLeftRoom", (username) => {
    console.log(userName + " has left the room")
})