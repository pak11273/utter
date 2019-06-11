import GlobalZone from "../../socketio/global.js"
const Global = new GlobalZone()

export const register_zone_handler = io => global => {
  Global.registerZone(global.username, global.avatar)

  var list = Global.getZoneList()
  io.emit("loggedInUser", list)
}
