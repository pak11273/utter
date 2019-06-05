import uniqBy from "lodash/uniqBy"

class SocketGlobal {
  constructor() {
    this.globalZone = []
  }

  getUser(id) {
    var getUser = this.globalZone.filter(userId => userId.user === id)[0]
    return getUser
  }

  removeUser(username) {
    var user = this.getUser(username)
    if (user) {
      this.users = this.globalZone.filter(user => user.username !== username)
    }
    return user
  }

  registerZone(username, avatar) {
    var zoneName = {
      username,
      avatar
    }
    this.globalZone.push(zoneName)
    this.globalZone = uniqBy(this.globalZone, "username")
    return zoneName
  }

  getZoneList() {
    return this.globalZone
  }
}

export default SocketGlobal
