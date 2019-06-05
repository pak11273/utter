/* eslint-disable no-plusplus */

// client side
import socket from "socket.io-client"
import {session, subscribe} from "brownies"

const socketClient = () => {
  var url = ""

  if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod")
    url = process.env.SOCKETIO_SERVER_URL
  else url = "http://192.168.68.8:3010"

  const io = socket(url)

  // Global
  subscribe(session, "user", value => {
    if (value && value.username) {
      io.emit("global", {
        username: session.user.username,
        avatar: session.user.avatar
      })
    }
  })

	// Pushes loggedin user to session.friends 
  io.on("loggedInUser", list => {
    var arr = []
    var contacts = (session.user && session.user.contacts) || []
    var names = contacts.map(item => {
      return item.username
    })

    for (var i = 0; i < list.length; i++) {
      if (names.indexOf(list[i].username) > -1) {
        arr.push(list[i].username)
      }
    }
    session.friends = arr
  })

  const newMessage = onMsgReceived => {
    io.on("newMessage", onMsgReceived)
  }

  const usersList = cb => {
    io.on("usersList", cb)
  }

  const createMessage = zone => {
    io.emit(
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
    io.emit("sendContactRequest", {
      contact,
      sender
    })
  }

  const newContactRequest = cb => {
    io.on("newContactRequest", contact => {
      console.log("friend: ", contact)
      cb(contact)
    })
  }

  const zoneConnect = zone => {
    /* zone = {username: "chachi", zoneId: "1234", zoneName: "hiachi"} */
    io.on("init", pics => {
      console.log("pics: ", pics)
    })

    io.emit("join", zone, () => {
      console.log("user has joined zone: ")
    })

    io.emit("joinAddContact", zone, () => {
      console.log("joined add Contact")
    })

    /* io.on("newContactRequest", contact => { */
    /*   console.log("friend: ", contact) */
    /* }) */
  }

  io.on("error", err => {
    console.log("received socket error:")
    console.log(err)
  })

  // Carousel

  return {
    createMessage,
    newMessage,
    newContactRequest,
    sendContactRequest,
    usersList,
    zoneConnect
    // Carousel
  }
}
const socketio = socketClient()
export default socketio
