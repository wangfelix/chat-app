class ChatRoom {
    constructor(roomId, roomName) {
        this.roomId = roomId
        this.roomName = roomName
        this.users = {}
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