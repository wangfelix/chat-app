const roomId = window.location.pathname.substr(1).split("/")[0]
const userId = window.location.pathname.substr(1).split("/")[1]

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.connect = this.connect.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
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
        this.connect();
    }

    connect() {
        // const socket = io();
        let that = this; // cache the this

        that.state.socket.on('connect', function(){
            console.log(that.state.socket);
            // that.setState(prevState => ({socket: socket}), ()=>{console.log(that.state)})
            console.log(that.state)
            that.state.socket.emit('joinRoom', {roomId, userId})
        })

        that.state.socket.on("room joined", ({roomName, userName, messages}) => {

            //TEST--
            console.log(that.state.socket.id);
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

        that.state.socket.on("new message", ({author, messageTime, message}) => {

            const msgObj = {author: author, messageTime: messageTime, message: message}
            that.setState(prevState => ({messages: [...prevState.messages, msgObj]}), ()=>{console.log(that.state)})
        })

        this.state.socket.on("userLeftRoom", (username) => {
            console.log(username + " has left the room")
        })
    }

    sendMessage() {
        //TODO Change message input content to a state property
        const message = document.getElementById('new-message').value
        console.log("new message: " + message)
        this.state.socket.emit('send message', {"roomId": roomId, "userId": userId, "message": message})
    }

    render() {

        return (
            <div>

                <NavBar state = {this.state}/>
                <p id="user-name">Your Name: </p>

                <div id="messages-container">

                    <div id="messages">
                        {this.state.messages.map(message => (<Message key={message.messageTime} messageData = {message}/>))}
                    </div>

                    <div id="write-message">
                        <input id="new-message" type="text"/>
                        <button id="send-new-message-btn" onClick={this.sendMessage}>></button>
                    </div>

                </div>

                <p id="share-room-link">Link to this room: </p>

            </div>
        );
    }
}

const domContainer = document.querySelector('#content');
ReactDOM.render(React.createElement(Room), domContainer);