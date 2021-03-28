let {generateId} = require('../util/helper')
let {ChatRoom, User, Message} = require('../application/User')
let moment = require('moment')

class ChatApp {
    constructor() {
        this.chatRooms = {}
    }

    getRoomName(roomId) {
        return this.chatRooms[roomId].getName()
    }

    /** Creates a new room with a unique ID, adds it to the list of active room
     * and returns the ID of the newly created room
     * @param roomName name of the to be created room
     * @return {String} The generated ID, that has been assigned to the created room
    */
    createRoom(roomName) {

        const addRoom = (roomId, roomName) => {

            // Case 1: There is no room with the given roomId
            if(this.chatRooms[roomId] === undefined) {
                this.chatRooms[roomId] = new ChatRoom(roomId, roomName)
                return roomId

            } else {
                // Case 2: A room with the given roomId already exists
                createRoom(roomName)
            }
        }

        const roomId = generateId(7)
        let finalId = addRoom(roomId, roomName)

        return finalId
    }

    /**
     * Creates a new user object and adds it to an existing room
     * @param userName the name of the to be created user
     * @param roomId the id of the room, that the user will be added to
     * @return {string} user ID of the newly created user object
     */
    createUserToRoom(userName, roomId) {

        const addUserToRoom = (user, roomId) => {
            if(this.chatRooms[roomId] !== undefined) {
                this.chatRooms[roomId].addUser(user)
            } else {
                console.log("ERROR: ChatRoomDoesnt Exist")
            }
        }

        // generates a unique ID for the new user object
        const userId = '_' + Math.random().toString(36).substr(2, 9);

        const user = new User(userId, userName)
        addUserToRoom(user, roomId)
        return userId
    }

    getUserName(userId, roomId) {
        return this.chatRooms[roomId].getUsersName(userId)
    }

    disconnectUserFromRoom(roomId, userId) {
       const disconnectedUserName = this.chatRooms[roomId].removeUser(userId)

        // TEST----------------------------------------------------------
        console.log("Chatrooms before deletion: ")
        console.log(this.chatRooms)
        // ---END TEST------------------------------------------------------

        // Remove Room after the last user left
        if(this.chatRooms[roomId].isEmpty()) {
            delete this.chatRooms[roomId]
        }

        // TEST-------------------------------------------------------------
        console.log("Chatrooms after deletion: ")
        console.log(this.chatRooms)
        // ---END TEST-------------------------------------------------------

        return disconnectedUserName
    }

    hasRoom(roomId) {
        return this.chatRooms[roomId] !== undefined;
    }

    getMessagesFromRoom(roomId) {
        let messagesClone = [...this.chatRooms[roomId].getMessages()]
        console.log("messageClone")
        console.log(messagesClone)

        if (messagesClone) {
            // Add attribute 'author' with the name of the corresponding 'userId' attribute

            messagesClone.forEach(message => {
                console.log("messagevar")
                console.log(message)
                message['author'] = this.getUserName(message.authorId, roomId)
            })
        }
        return messagesClone
    }


    createMessage(userId, roomId, message) {
        const room = this.chatRooms[roomId]
        let messageTime = moment().format('MMMM Do YYYY, h:mm:ss a')
        const messageObj = new Message(userId, message, messageTime)
        room.addMessage(messageObj)

        return {
            "author": this.getUserName(userId, roomId),
            "messageTime": messageTime,
            "message": message
        }
    }

    getUsersFromRoom(roomId) {
        return this.chatRooms[roomId].getUsers()
    }
}





module.exports = ChatApp