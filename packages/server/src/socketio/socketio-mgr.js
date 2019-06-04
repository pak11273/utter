// server side
import socket from "socket.io"
import uniqBy from "lodash/uniqBy"
import SocketUsers from "../socketio/users.js"
import GlobalZone from "../socketio/global.js"

const Users = new SocketUsers()
const Global = new GlobalZone()

export default server => {
  const io = socket(server)

  // global

  io.on("connection", socket => {
    io.on("global", data => {
      Global.registerZone(socket.id, data.username, data.avatar)
      console.log("Global: ", Global)
    })

    socket.on("global", global => {
      socket.join(global.zone)

      /* registerZone(socketId, username, zone, avatar) { */
      Global.registerZone(socket.id, global.username, global.avatar)

      var nameProp = Global.getZoneList(global.zone)
      const arr = uniqBy(nameProp, "username")
      console.log(nameProp)
      io.to(global.zone).emit("loggedInUser", arr)
    })
    io.emit("hi", "everyone")

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
