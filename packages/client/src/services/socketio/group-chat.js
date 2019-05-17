/* eslint-disable no-unused-vars */
// client side

import io from "socket.io-client"

export default zoneId => {
  var url = ""

  if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod")
    url = process.env.SOCKETIO_SERVER_URL
  else url = "http://192.168.68.8:3010"

  const socket = io(url)

  const newMessage = ({username, msg, zoneId}) => {
    return socket.on("newMessage", ({username, msg, zoneId}) => {
      console.log("hahahahahahahaha")

      return {
        username,
        msg,
        zoneId
      }
    })
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
    socket.emit("join", zoneId, () => {
      console.log("user has joined zone: ", zoneId)
    })
  })

  socket.on("error", err => {
    console.log("received socket error:")
    console.log(err)
  })

  socket.on("newMessage", ({username, msg, zoneId}) => {
    console.log("username: ", username)
    console.log("new message: ", msg)
    console.log("zoneId: ", zoneId)
  })

  return {
    createMessage,
    newMessage
  }
}
