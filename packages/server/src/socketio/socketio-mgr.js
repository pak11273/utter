// server side
import socket from "socket.io"
import uniqBy from "lodash/uniqBy"
import remove from "lodash/remove"
import SocketUsers from "../socketio/users.js"
import GlobalZone from "../socketio/global.js"

const Users = new SocketUsers()
const Global = new GlobalZone()

export default server => {
  const io = socket(server)

  // global

  io.on("connection", socket => {
    console.log("a user connected")
    socket.on("global", global => {
      Global.registerZone(global.username, global.avatar)

      var list = Global.getZoneList()
      console.log("list: ", list)
      io.emit("loggedInUser", list)
    })

    // group chat

    socket.on("join", (zone, cb) => {
      socket.join(zone.zoneId)

      Users.addUserData(socket.id, zone.zoneId, zone.zoneName, zone.username)

      io.to(zone.zoneId).emit("usersList", Users.getUsersList(zone.zoneId))

      cb()
    })

    socket.on("joinAddContact", (zone, cb) => {
      socket.join(zone.username)

      cb()
    })

    socket.on("sendContactRequest", zone => {
      io.to(zone.contact).emit("newContactRequest", {
        from: zone.sender,
        to: zone.contact
      })
    })

    socket.on("disconnect", () => {
      console.log("a user disconnected")
      // remove user from zone
      var user = Users.removeUserId(socket.id)
      var global = Global.removeUser(socket.username)

      if (user) {
        io.to(user.zoneId).emit("usersList", Users.getUsersList(user.zoneId))
      }

      if (global) {
        var globalZone = Global.getZoneList()
        console.log("globalZone: ", globalZone)
        var arr = uniqBy(globalZone, "username")
        console.log("sockert naem: ", socket.username)
        const removeUser = remove(arr, socket.username)
        console.log("remove user: ", removeUser)
        console.log("arr: ", arr)
        io.emit("loggedInUser", arr)
      }
    })

    socket.on("createMessage", ({username, msg, zoneId}, cb) => {
      io.to(zoneId).emit("newMessage", {
        username,
        msg,
        zoneId
      })
      cb()
    })

    socket.on("register", ({username, cb}) => {
      return cb(null, username)
    })

    // apps

    // carousel
  })

  return io
}
