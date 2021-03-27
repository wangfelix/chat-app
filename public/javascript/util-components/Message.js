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