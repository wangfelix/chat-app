const socket = io()

socket.on('connect', function(){
    console.log(socket.id);
})

socket.on("room created", ({roomId, userId}) => {
    window.location.href = "/" + roomId + "/" + userId
})


class CreateRoomForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            roomName: "",
            hostName: ""
        };
    }

    createRoom(e) {
        e.preventDefault();

        const newRoomName = document.getElementById('newRoomName').value
        const userName = document.getElementById('userName').value
        socket.emit('createRoom', {"roomName": newRoomName, "userName": userName})
    }

    render() {
        if (this.state.clicked) {
            return 'You liked this.';
        }


        return (
            <form className={"create-room-form"}>
                <h1>Create Chat-Room</h1>
                <div className={"input-container"}>
                    <label>Room Name:</label>
                    <input className={"input"} id="newRoomName" type="text"/>
                </div>
                <div className={"input-container"}>
                    <label>Chose your Username:</label>
                    <input className={"input"} id="userName" type="text"/>
                </div>

                <button id="create-room-btn" onClick={(e) => {this.createRoom(e)}}>Create Room</button>
            </form>
        );
    }
}

const domContainer = document.querySelector('#content');
ReactDOM.render(React.createElement(CreateRoomForm), domContainer);