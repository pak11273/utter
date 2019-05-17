// server side
import socket from "socket.io"

export default async server => {
  const io = socket(server)

  io.on("connection", socket => {
    console.log("user connected")

    socket.on("join", (zone, cb) => {
      console.log("zone: ", zone)
      socket.join(zone)
      cb()
    })

    socket.on("createMessage", ({username, msg, zoneId}, cb) => {
      console.log("message: ", msg)
      io.to(zoneId).emit("newMessage", {
        username,
        msg,
        zoneId
      })
      cb()
    })
  })
}
