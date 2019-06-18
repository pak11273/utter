/* eslint-disable no-plusplus */
// constants
import {GLOBAL_REGISTER, CREATE_USERZONE, REMOVE_USERZONE} from "./constants"

// client side
import io from "socket.io-client"
import {session, subscribe} from "brownies"

const socketClient = () => {
  var url = ""

  if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod")
    url = process.env.SOCKETIO_SERVER_URL
  else url = "http://192.168.68.8:3010"

  // TODO: to upgrade from 600 concurrent connections to 9k use this, it keeps socket.io from trying to longpoll if user doesn't support websockets:
  /* var socket = io(url, { upgrade: false, transports: ['websocket'] }) */
  var socket = io(url)

  // GLOBAL EVENTS
  // reconnect
  const reconnect = () => {
    if (!socket.connected) {
      socket = io(url)
    }
  }

  // creates a userzone and sends all contacts online stat
  const userzoneConnect = (userData, cb) => {
    socket.emit(CREATE_USERZONE, userData, cb)
  }

  const userzoneDisconnect = (userData, cb) => {
    socket.emit(REMOVE_USERZONE, userData, cb)
  }

  /* username: session.user && session.user.username */

  // Register a user to the global zone as soon as he logs in
  subscribe(session, "user", value => {
    if (value && value.username) {
      socket.emit(GLOBAL_REGISTER, {
        username: session.user.username,
        avatar: session.user.avatar
      })
    }
  })

  // Pushes loggedin user to session.friends
  socket.on("loggedInUser", list => {
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

  const disconnect = () => {
    socket.close()
  }

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
    socket.emit("sendContactRequest", {
      contact,
      sender
    })
  }

  const newContactRequest = cb => {
    socket.on("newContactRequest", contact => {
      console.log("friend: ", contact)
      cb(contact)
    })
  }

  // Zone functions

  const zoneConnect = zone => {
    /* zone = {username: "chachi", zoneId: "1234", zoneName: "hiachi"} */
    socket.on("init", pics => {
      console.log("pics: ", pics)
    })

    socket.emit("join", zone, () => {
      console.log("user has joined zone: ")
    })

    socket.emit("joinAddContact", zone, () => {
      console.log("joined add Contact")
    })

    /* socket.on("newContactRequest", contact => { */
    /*   console.log("friend: ", contact) */
    /* }) */
  }

  const zoneDisconnect = zone => {
    socket.emit("leave", zone, () => {
      console.log("user has left zone: ")
    })
  }

  socket.on("error", err => {
    console.log("received socket error:")
    console.log(err)
  })

  // Carousel

  // Admin
  const getSocketioConnections = cb => {
    socket.emit("getSocketioConnections", cb)
  }

  return {
    createMessage,
    disconnect,
    newMessage,
    newContactRequest,
    reconnect,
    sendContactRequest,
    usersList,
    userzoneConnect,
    userzoneDisconnect,
    zoneConnect,
    zoneDisconnect,
    // Carousel
    // Admin
    getSocketioConnections
  }
}
const socketio = socketClient()
export default socketio
