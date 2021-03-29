const roomId = window.location.pathname.substr(1).split("/")[0]

class JoinRoomPage extends React.Component {
    constructor(props) {
        super(props);
        this.createUser = this.createUser.bind(this)
        this.state = {
           socket: null
        };
    }

    componentWillMount() {
        const socket = io();
        this.setState(prevState => ({socket: socket}))
    }

    componentDidMount() {
        const that = this
        that.state.socket.on('connect', function(){
            that.state.socket.emit()
        })

        that.state.socket.on("user created", (userId) => {
            window.location.href = "/" + roomId + "/" + userId
        })
    }

    createUser() {
        const userName = document.getElementById('user-name').value
        this.state.socket.emit('createUser', {"roomId": roomId, "userName": userName})
    }

    render() {
        return (
            <div id={"join-room-page-div"}>
                <h2 id={"room-name"}>You are about to join a room </h2>
                <div id={"input-container"}>
                    <label>Choose Username:</label>
                    <input id={"user-name"} type="text"/>
                </div>
                <button id={"submitUserName"} onClick={this.createUser}>Join Room</button>
            </div>
        );
    }
}

const domContainer = document.getElementById('content');
ReactDOM.render(React.createElement(JoinRoomPage), domContainer);