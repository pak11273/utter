// server side
import socket from "socket.io"
import SocketUsers from "../socketio/users.js"
import GlobalZone from "../socketio/global.js"

const Users = new SocketUsers()
const Global = new GlobalZone()

export default server => {
  const io = socket(server)

  // global

  io.on("connection", socket => {
    socket.on("global", global => {
      /* registerZone(socketId, username, zone, avatar) { */
      Global.registerZone(global.username, global.avatar)

      var list = Global.getZoneList()
      console.log(list)
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
      var user = Users.removeUserId(socket.id)

      if (user) {
        io.to(user.zoneId).emit("usersList", Users.getUsersList(user.zoneId))
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
