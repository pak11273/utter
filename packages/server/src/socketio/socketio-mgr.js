// server side
import io from "socket.io"
import uniqBy from "lodash/uniqBy"
import remove from "lodash/remove"
import SocketUsers from "../socketio/users.js"
import GlobalZone from "../socketio/global.js"

// constants
import {GLOBAL_REGISTER, CREATE_USERZONE, JOIN_CONTACT_ZONES} from "./constants"

// handlers
import {register_zone_handler} from "./handlers/global-handlers.js"
import {create_userzone_handler} from "./handlers/user_handlers.js"

const Users = new SocketUsers()
const Global = new GlobalZone()

import User from "../api/user/user-model.js"
import {redis} from "../redis.js"

export default server => {
  const socket = io(server)

  socket.on("connection", client => {
    console.log("a user connected")

    // GLOBAL EVENTS

    client.on(GLOBAL_REGISTER, register_zone_handler(socket))

    // create userzone: userzones are personal zones used for keeping track of a user's stat and private messages
    // TODO: join every contact in your contacts list
    client.on(CREATE_USERZONE, create_userzone_handler(redis, client))

    // ZONE EVENTS

    // join zone
    client.on("join", (zone, cb) => {
      client.join(zone.zoneId)

      Users.addUserData(client.id, zone.zoneId, zone.zoneName, zone.username)

      socket.to(zone.zoneId).emit("usersList", Users.getUsersList(zone.zoneId))

      cb()
    })

    client.on("leave", (zone, cb) => {
      client.leave(zone.zoneId)

      Users.removeUser(zone.username)

      socket.to(zone.zoneId).emit("usersList", Users.getUsersList(zone.zoneId))

      cb()
    })

    client.on("joinAddContact", (zone, cb) => {
      client.join(zone.username)

      cb()
    })

    client.on("sendContactRequest", zone => {
      socket.to(zone.contact).emit("newContactRequest", {
        from: zone.sender,
        to: zone.contact
      })
    })

    client.on("disconnect", async () => {
      console.log("a user disconnected")
    })

    client.on("disconnecting", () => {
      let rooms = Object.keys(client.rooms)

      // delete user hash and from userzone
      rooms.map(item => {
        redis.del(item)
        redis.srem("userzones", item)
      })

      // TODO: make opposite
      // remove user from redis userzone and update stat to contacts

      // remove user from zone
      console.log("list: ", Users.getUsersList())
      /* var user = Users.removeUserId(client.id) */
      /* var global = Global.removeUser(client.username) */

      /* if (user) { */
      /*   socket */
      /*     .to(user.zoneId) */
      /*     .emit("usersList", Users.getUsersList(user.zoneId)) */
      /* } */

      /* if (global) { */
      /*   var globalZone = Global.getZoneList() */
      /*   console.log("globalZone: ", globalZone) */
      /*   var arr = uniqBy(globalZone, "username") */
      /*   console.log("sockert naem: ", client.username) */
      /*   const removeUser = remove(arr, client.username) */
      /*   console.log("remove user: ", removeUser) */
      /*   console.log("arr: ", arr) */
      /*   socket.emit("loggedInUser", arr) */
      /* } */
    })

    client.on("createMessage", ({username, msg, zoneId}, cb) => {
      socket.to(zoneId).emit("newMessage", {
        username,
        msg,
        zoneId
      })
      cb()
    })

    client.on("register", ({username, cb}) => {
      return cb(null, username)
    })

    // apps

    // carousel

    // admin
    /* socket.emit("getSocketioConnections", socket.engine.clientsCount) */
    client.on("getSocketioConnections", cb => {
      return cb(socket.engine.clientsCount)
    })
  })

  return socket
}
