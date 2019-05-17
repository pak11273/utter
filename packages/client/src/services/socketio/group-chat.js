/* eslint-disable no-unused-vars */
// client side

import io from "socket.io-client"

export default zoneId => {
  var url = ""

  if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod")
    url = process.env.SOCKETIO_SERVER_URL
  else url = "http://192.168.68.8:3010"

  const socket = io(url)

  const newMessage = onMsgReceived => {
    socket.on("newMessage", onMsgReceived)
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

  return {
    createMessage,
    newMessage
  }
}
