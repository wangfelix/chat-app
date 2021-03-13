class ChatRoom {
    constructor(roomId, roomName) {
        this.roomId = roomId
        this.roomName = roomName
        this.users = {}
    }

    isEmpty() {
        return Object.keys(this.users).length === 0
    }

    getName() {
        return this.roomName
    }

    addUser(user) {
        this.users[user.getId()] = user
    }

    getUsersName(userId) {
        return this.users[userId].getName()
    }

    removeUser(userId) {
        const userName = this.users[userId].getName()
        console.log("before deletion in room: " + this.roomName)
        console.log(this.users)
        delete this.users[userId]
        console.log("after deletion in room: " + this.roomName)
        console.log(this.users)
        return userName
    }



}

class User {
    constructor(userId, userName) {
        this.userId = userId
        this.userName = userName
    }

    getId() {
        return this.userId
    }

    getName() {
        return this.userName
    }
}

module.exports = {ChatRoom, User}