const socket = io()
const roomId = window.location.pathname.substr(1).split("/")[0]
console.log("join room verbunden")

socket.on('connect', function(){
    socket.emit()
})

function createUser() {
    const userName = document.getElementById('userName').value
    socket.emit('createUser', {"roomId": roomId, "userName": userName})
}
socket.on("user created", (userId) => {
    window.location.href = "/" + roomId + "/" + userId
})