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