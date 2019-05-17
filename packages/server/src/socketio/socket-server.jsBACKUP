import socketio from "socket.io"
import path from "path"
import ss from "socket.io-stream"
import SocketManager from "./socket-mgr.js"
import ZoneManager from "./zone-mgr.js"
import makeHandlers from "./handlers"
import Users from "./users.js"

export default async server => {
  const io = socketio(server)

  const socketManager = SocketManager()
  const zoneManager = await ZoneManager()
  const users = new Users()

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

    console.log("User connected to socket: " + socket.id)

    socket.on("createMessage", (msgObj, cb) => {
      if (msgObj.message.length > 255) {
        var err = "Messages cannot be over 255 characters."
      } else {
        err = null
      }
      if (err) {
        var success = null
      } else {
        success = "sucess"
      }
      io.to(msgObj.zoneId).emit("newMessage", {
        data: msgObj
      })
      cb(err, msgObj)
    })

    socket.on("join", (zone, username, cb) => {
      socket.join(zone.id)
      users.addUserData(socket.id, zone.id, zone.zoneName, username)
      io.to(zone.id).emit("usersList", users.getUsersList(zone.id))
      cb()
    })

    socket.on("disconnect", () => {
      console.log("users: ", users)
      console.log("SOCKET: ", socket.id)
      var user = users.removeUserId(socket.id)
      if (user) {
        io.to(user.zoneId).emit("usersList", users.getUsersList(user.zoneId))
      }
      console.log("socket disconnect...", socket.id)
      handleDisconnect()
    })

    // TODO: NEW API BELOW

    socket.on("register", handleRegister)

    /* socket.on("join", handleJoin) */

    socket.on("leave", handleLeave)

    socket.on("message", handleMessage)

    socket.on("zones", handleGetZones)

    socket.on("availableUsers", handleGetAvailableUsers)

    /* socket.on("disconnect", () => { */
    /*   console.log("socket disconnect...", socket.id) */
    /*   handleDisconnect() */
    /* }) */

    socket.on("error", function(err) {
      console.log("received error from socket:", socket.id)
      console.log(err)
    })

    /* socket.on("disconnect", socket => { */
    /*   console.log("user disconnected") */
    /*   io.emit("disconnect", {status: "disconnected"}) */
    /* }) */
  })
}
