const roomId = window.location.pathname.substr(1).split("/")[0]
const userId = window.location.pathname.substr(1).split("/")[1]

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: null,
            messages: [
                {author: "Bot", messageTime: "0.0", message: "Hallo, schön dich zu sehen!"},
                {author: "Bot", messageTime: "0.1", message: "Lade doch deine Freunde mit dem Link ein!"}
                ]
        };
    }

    componentWillMount() {
        const socket = io();
        this.setState(prevState => ({socket: socket}), ()=>{console.log(this.state)})
    }

    componentDidMount() {
        let that = this; // cache the this

        that.state.socket.on('connect', function(){
            console.log(that.state.socket);
            // that.setState(prevState => ({socket: socket}), ()=>{console.log(that.state)})
            console.log(that.state)
            that.state.socket.emit('joinRoom', {roomId, userId})
        })

        that.state.socket.on("room joined", ({roomName, userName, messages}) => {

            document.getElementById('room-name').innerHTML = roomName
            document.getElementById('user-name').innerHTML += userName
            document.getElementById('share-room-link').value = "" + window.location.host + "/" +window.location.pathname.substr(1).split("/")[0]

            console.log("messages:")
            console.log(messages)

        })

        that.state.socket.on("new message", ({author, messageTime, message}) => {

            const msgObj = {author: author, messageTime: messageTime, message: message}
            that.setState(prevState => ({messages: [...prevState.messages, msgObj]}), ()=>{console.log(that.state)})
        })

        this.state.socket.on("userLeftRoom", (username) => {
            console.log(username + " has left the room")
        })
    }

    render() {

        return (
            <div id={"room-div"}>

                <NavBar state = {this.state}/>

                <div id={"main-content-container"}>
                    <div id="messages-container">

                        <div id="messages">
                            {this.state.messages.map(message => (<Message key={message.messageTime} messageData = {message}/>))}
                        </div>

                        <MessageTextBox socket = {this.state.socket}/>

                    </div>

                    {/*TODO Rechte Leiste mit aktiven Nutzern*/}
                    <div id={"test"}>
                        <p id="user-name">Users: </p>
                    </div>
                </div>

            </div>
        );
    }
}

const domContainer = document.querySelector('#content');
ReactDOM.render(React.createElement(Room), domContainer);