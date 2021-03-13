let {generateId} = require('../util/helper')
let {ChatRoom, User} = require('../application/User')

class ChatApp {
    constructor() {
        this.chatRooms = {}
    }

    getRoomName(roomId) {
        return this.chatRooms[roomId].getName()
    }

    /** Creates a new room with a unique ID, adds it to the list of active room
     * and returns the ID of the newly created room
     * @param {String} roomName name of the to be created room
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
}





module.exports = ChatApp