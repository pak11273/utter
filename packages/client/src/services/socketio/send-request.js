/* eslint-disable no-plusplus */

import io from "socket.io-client"

export default zone => {
  console.log("zone: ", zone)
  let url

  if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod")
    url = process.env.SOCKETIO_SERVER_URL
  else url = "http://192.168.68.8:3010"

  const socket = io(url)

  console.log(socket)
}
