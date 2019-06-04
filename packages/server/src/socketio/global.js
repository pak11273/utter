import uniqBy from "lodash/uniqBy"

class SocketGlobal {
  constructor() {
    this.globalZone = []
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
