// server side
import socket from "socket.io"
import SocketUsers from "../socketio/users.js"

const Users = new SocketUsers()

const handleEvent = (zoneId, createEntry) => {
  // append event to chat history
  const entry = {user, ...createEntry()}
  zone.addEntry(entry)

  // notify other clients in zone
  zone.broadcastMessage({chat: zoneId, ...entry})
  return zone
}

export default async server => {
  const io = socket(server)

  io.on("connection", socket => {
    console.log("user connected")

    socket.on("join", (zone, cb) => {
      console.log("zone: ", zone)
      socket.join(zone.zoneId)

      console.log("zone: ", zone)

      Users.addUserData(socket.id, zone.zoneId, zone.zoneName, zone.username)

      console.log("Users: ", Users)

      io.to(zone.zoneId).emit("usersList", Users.getUsersList(zone.zoneId))

      cb()
    })

    socket.on("joinAddContact", (zone, cb) => {
      console.log("socket join add contact: ", zone.username)
      socket.join(zone.username)

      cb()
    })

    socket.on("sendContactRequest", (zone, cb) => {
      io.to(zone.contact).emit("newContactRequest", {
        from: zone.sender,
        to: zone.contact
      })

      cb()
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
  })
}
