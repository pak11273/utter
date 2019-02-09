import socketio from "socket.io"
import path from "path"
import ss from "socket.io-stream"
import SocketManager from "./socket-mgr.js"
import ZoneManager from "./zone-mgr.js"
import makeHandlers from "./handlers"

export default async server => {
  const io = socketio(server)

  const socketManager = SocketManager()
  const zoneManager = await ZoneManager()

  io.on("connection", socket => {
    const {
      handleRegister,
      handleJoin,
      handleLeave,
      handleMessage,
      handleGetZones,
      handleGetAvailableUsers,
      handleDisconnect
    } = makeHandlers(socket, socketManager, zoneManager)

    console.log("User connected to chat")

    /* socket.on("join", (params, cb) => { */
    /*   console.log("params: ", params) */
    /*   console.log("params: ", params) */
    /*   socket.join(params.zoneName) */
    /*   cb() */
    /* }) */

    socket.on("createMessage", msg => {
      console.log("val: ", msg)
      io.to(msg.zoneName).emit("newMessage", {
        msg: msg.msg,
        zoneName: msg.zoneName
      })
    })

    console.log("User " + socket.id + " connected")

    socket.on("register", handleRegister)

    socket.on("join", handleJoin)

    socket.on("leave", handleLeave)

    socket.on("message", handleMessage)

    socket.on("zones", handleGetZones)

    socket.on("availableUsers", handleGetAvailableUsers)

    socket.on("disconnect", function() {
      console.log("socket disconnect...", socket.id)
      handleDisconnect()
    })

    socket.on("error", function(err) {
      console.log("received error from socket:", socket.id)
      console.log(err)
    })

    socket.on("disconnect", socket => {
      console.log("user disconnected")
      io.emit("disconnect", {status: "disconnected"})
    })
  })
}
