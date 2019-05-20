/* eslint-disable no-plusplus */

import io from "socket.io-client"

export default zone => {
  let url

  if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod")
    url = process.env.SOCKETIO_SERVER_URL
  else url = "http://192.168.68.8:3010"

  const socket = io(url)

  socket.on("connect", () => {
    socket.emit("join", zone, () => {
      console.log("user register to send request: ", zone)
    })
  })

  console.log(socket)
}
