const socket = io()

let keys = location.search.substr(1).split("&")

socket.on('connect', function(){
    console.log(socket.id);
})

function createRoom() {
    const newRoomName = document.getElementById('newRoomName').value
    const userName = document.getElementById('userName').value
    socket.emit('createRoom', {"roomName": newRoomName, "userName": userName})
}

socket.on("room created", ({roomId, userId}) => {
    window.location.href = "/" + roomId + "/" + userId
})
