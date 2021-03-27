const socket = io()
const roomId = window.location.pathname.substr(1).split("/")[0]
const userId = window.location.pathname.substr(1).split("/")[1]

let keys = location.search.substr(1).split("&")

console.log("rooms.js connected")

socket.on('connect', function(){
//    console.log(socket.id);
    socket.emit('joinRoom', {roomId, userId})
})

socket.on("room joined", ({roomName, userName, messages}) => {

    //TEST--
    console.log(socket.id);
    console.log("room joined")
    console.log("Username: " + userName)
    console.log("Roomname: " + roomName)
    //--END TEST

    document.getElementById('room-name').innerHTML = roomName
    document.getElementById('user-name').innerHTML += userName
    document.getElementById('share-room-link').innerHTML = "" + window.location.host + "/" +window.location.pathname.substr(1).split("/")[0]

    console.log("messages:")
    console.log(messages)

})

function sendMessage() {
    const message = document.getElementById('new-message').value
    console.log("new message: " + message)
    socket.emit('send message', {"roomId": roomId, "userId": userId, "message": message})
}

socket.on("new message", ({author, messageTime, message}) => {


    //TEST--
    console.log(socket.id);
    console.log("new Message")
    console.log("author: " + author)
    console.log("messageTime: " + messageTime)
    console.log("message: " + message)

    let messagesDiv = document.getElementById('messages')
    const p = document.createElement("P")
    p.appendChild(document.createTextNode(message))
    messagesDiv.appendChild(p)


})

function leaveRoom() {

    socket.emit('leaveRoom', {"roomId": roomId, "userId": userId})

    window.location.href = "/"
}
socket.on("userLeftRoom", (username) => {
    console.log(userName + " has left the room")
})



class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    render() {

        return (
            <div>
                <div id="nav-bar">
                    <p id="room-name">Room Name: </p>
                    <p id="user-name">Your Name: </p>
                    <button id="leave-room" onClick={() => leaveRoom()}>Leave Room</button>
                </div>
                <div id="messages-container">
                    <div id="messages"></div>
                    <div id="write-message">
                        <input id="new-message" type="text"/>
                        <button id="send-new-message" onClick={sendMessage}>Send Message</button>
                    </div>
                </div>
                <p id="share-room-link">Link to this room: </p>
                <Message></Message>
            </div>
        );
    }
}

const domContainer = document.querySelector('#content');
ReactDOM.render(React.createElement(Room), domContainer);