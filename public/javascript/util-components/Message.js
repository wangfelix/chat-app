class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: this.props.messageData.message,
            author: this.props.messageData.author,
            messageTime: this.props.messageData.messageTime
        }
    }

    render() {
        return (
            <div id={"message"}>
                <div id={"author-div"}><p>{this.state.author}</p></div>
                <div id={"msg-div"}><p>{this.state.message}</p></div>
                <div id={"message-time-div"}><p>{this.state.messageTime}</p></div>
            </div>

        )
    }
}

class MessageTextBox extends React.Component{

    constructor(props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this)
        this.state = {
            socket: this.props.socket
        }
    }

    sendMessage() {
        //TODO Change message input content to a state property
        const message = document.getElementById('new-message').value
        console.log("new message: " + message)
        this.state.socket.emit('send message', {"roomId": roomId, "userId": userId, "message": message})
    }

    render() {
        return(
            <div id="write-message">
                <input id="new-message" type="text"/>
                <button id="send-new-message-btn" onClick={this.sendMessage}>></button>
            </div>
        )
    }
}