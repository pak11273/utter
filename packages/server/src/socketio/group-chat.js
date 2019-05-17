// server side
import socket from "socket.io"

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

    socket.on("join", (obj, cb) => {
      socket.join(obj.zoneId)
      cb()
    })

    socket.on("createMessage", ({username, msg, zoneId}, cb) => {
      console.log("zoneid: ", typeof zoneId)
      console.log("usern: ", username)
      console.log("msg: ", msg)
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
