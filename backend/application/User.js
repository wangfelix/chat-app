class ChatRoom {
    constructor(roomId, roomName) {
        this.roomId = roomId
        this.roomName = roomName
        this.users = {}
        this.messages = []
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
        console.log("userId: " + userId)
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

    addMessage(message) {
        this.messages.push(message)
    }

    getMessages() {
        return this.messages
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

class Message {
    constructor(userId, message, messageTime) {
        this.authorId = userId
        this.messageTime = messageTime
        this.message = message
    }
}

module.exports = {ChatRoom, User, Message}