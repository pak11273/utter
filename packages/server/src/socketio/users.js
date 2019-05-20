class SocketUsers {
  constructor() {
    this.users = []
  }

  addUserData(socketId, zoneId, zoneName, username) {
    var users = {
      socketId,
      zoneId,
      zoneName,
      username
    }
    this.users.push(users)
    return users
  }

  removeUser(id) {
    var user = this.getUser(id)
    if (user) {
      this.users.filter(user => user.id !== id)
    }
    return user
  }

  getUser(id) {
    var getUser = this.users.filter(userId => userId.user === id)[0]
    return getUser
  }

  removeUserId(socketId) {
    var user = this.getUser(socketId)
    if (user) {
      this.users = this.users.filter(user => user.socketId !== socketId)
      console.log("users after get him: ", this.users)
    }
    return user
  }

  getUser(socketId) {
    var getUser = this.users.filter(user => {
      return user.socketId === socketId
    })[0]
    return getUser
  }

  getUsersList(zoneId) {
    var users = this.users.filter(user => user.zoneId === zoneId)

    var namesArr = users.map(user => user.username)
    return namesArr
  }
}

export default SocketUsers
