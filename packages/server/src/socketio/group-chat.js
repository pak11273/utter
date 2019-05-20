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
      socket.join(zone.zoneId)

      console.log("zone: ", zone)
      Users.addUserData(
        zone.socketId,
        zone.zoneId,
        zone.zoneName,
        zone.username
      )
      console.log("Users: ", Users)

      cb()
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
