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

    componentWillReceiveProps(nextProps) {
        console.log("nextProps")
        console.log(nextProps)
        this.setState({ state: nextProps.state });
    }

    leaveRoom() {

        this.state.socket.emit('leaveRoom', {"roomId": roomId, "userId": userId})

        window.location.href = "/"
    }

    render() {
        return (
            <div id={"navbar"}>
                <div></div>
                <button id="leave-room" onClick={this.leaveRoom}>Leaves Room</button>
                <div id={"room-name-container"}>
                    <h2 id={"room-name"}>Room Name</h2>
                </div>
                <button id="leave-room" key={this.props.socket} onClick={this.leaveRoom}>Leave Room</button>
                <div></div>
            </div>
        )
    }
}