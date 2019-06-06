import GlobalZone from "../../socketio/global.js"
const Global = new GlobalZone()

export const register_zone_handler = io => global => {
  Global.registerZone(global.username, global.avatar)

  var list = Global.getZoneList()
  console.log("list: ", list)
  io.emit("loggedInUser", list)
}
