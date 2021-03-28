const roomId = window.location.pathname.substr(1).split("/")[0]
const userId = window.location.pathname.substr(1).split("/")[1]

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: this.props.state.socket
        }
        this.leaveRoom = this.leaveRoom.bind(this)
    }

    leaveRoom() {
        this.state.socket.emit('leaveRoom', {"roomId": roomId, "userId": userId})
        window.location.href = "/"
    }

    render() {
        return (
            <div id={"navbar"}>
                <div></div>
                <div id={"share-link-container"}>
                    <p id={"share-link-label"}>Share-Link: </p>
                    <input id={"share-room-link"} type="text" readOnly value={this.props.state.shareLink}/>
                </div>
                <div id={"room-name-container"}>
                    <h2 id={"room-name"}>{this.props.state.roomName}</h2>
                </div>
                <div id={"leave-room-container"}>
                    <button id="leave-room" onClick={this.leaveRoom}>Leave Room</button>
                </div>
                <div></div>
            </div>
        )
    }
}