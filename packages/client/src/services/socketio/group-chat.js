/* eslint-disable no-plusplus */

// client side
import io from "socket.io-client"

export default () => {
  var url = ""

  if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod")
    url = process.env.SOCKETIO_SERVER_URL
  else url = "http://192.168.68.8:3010"

  const socket = io(url)

  const newMessage = onMsgReceived => {
    socket.on("newMessage", onMsgReceived)
  }

  const usersList = cb => {
    socket.on("usersList", cb)
  }

  const createMessage = zone => {
    socket.emit(
      "createMessage",
      {
        username: zone.username,
        zoneId: zone.zoneId,
        msg: zone.message
      },
      zone.cb
    )
  }

  const sendContactRequest = (contact, sender) => {
    socket.emit(
      "sendContactRequest",
      {
        contact,
        sender
      },
      () => console.log("request was sent")
    )
  }

  const newContactRequest = () => {
    socket.on("newContactRequest", contact => {
			cb(contact)
      console.log("friend: ", contact)
    })
  }

  const zoneConnect = zone => {
    /* zone = {username: "chachi", zoneId: "1234", zoneName: "hiachi"} */
    socket.emit("join", zone, () => {
      console.log("user has joined zone: ")
    })

    socket.emit("joinAddContact", zone, () => {
      console.log("joined add Contact")
    })

    socket.on("newContactRequest", contact => {
      window.app.socketio.contact = contact
      console.log("friend: ", contact)
    })
  }

  socket.on("error", err => {
    console.log("received socket error:")
    console.log(err)
  })

  return {
    createMessage,
    newMessage,
    newContactRequest,
    sendContactRequest,
    usersList,
    zoneConnect
  }
}
