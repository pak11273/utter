/* eslint-disable no-unused-vars */
// client side

import io from "socket.io-client"

export default zone => {
  var url = ""

  if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod")
    url = process.env.SOCKETIO_SERVER_URL
  else url = "http://192.168.68.8:3010"

  const socket = io(url)

  const newMessage = msg => {
    console.log("new message: ", msg)
  }

  const createMessage = obj => {
    socket.emit(
      "createMessage",
      {
        username: obj.username,
        zoneId: obj.zoneId,
        msg: obj.message
      },
      obj.cb
    )
  }

  socket.on("connect", () => {
    console.log("user connected")

    socket.emit("join", zone, () => {
      console.log("user has joined zone: ", zone)
    })
  })

  socket.on("newMessage", ({username, msg, zoneId}) => {
    console.log("username; ", username)
    console.log("new msg: ", msg)
    console.log("new zone: ", zoneId)
  })

  return {
    createMessage,
    newMessage
  }
}
