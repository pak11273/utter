class SocketGlobal {
  constructor() {
    this.globalZone = []
  }

  registerZone(socketId, username, avatar) {
    var zoneName = {
      socketId,
      username,
      avatar
    }
    this.globalZone.push(zoneName)
    return zoneName
  }

  getZoneList(zoneId) {
    var zoneName = this.globalZone.filter(user => user.zoneId === zoneId)

    var namesArr = zoneName.map(user => {
      return {
        username: user.username,
        avatar: user.avatar
      }
    })
    return namesArr
  }
}

export default SocketGlobal
