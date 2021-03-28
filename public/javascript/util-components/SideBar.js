class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={"sidebar"}>
                <div id={"user-name-list"}>
                    <h3 id="user-name">Users in this room: </h3>
                    <div className={"separator"}/>
                    {this.props.users.map(user => (<p className={"user-name"} key={user.userId}>{user.userName}</p>))}
                </div>
            </div>
        )
    }
}