// server side
import io from "socket.io"
import uniqBy from "lodash/uniqBy"
import remove from "lodash/remove"
import SocketUsers from "../socketio/users.js"
import GlobalZone from "../socketio/global.js"

// constants
import {GLOBAL_REGISTER, CREATE_USERZONE} from "./constants"

// handlers
import {register_zone_handler} from "./handlers/global-handlers.js"

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

    // create userzone
    client.on(CREATE_USERZONE, async (userData, cb) => {
      try {
        // join userzone
        client.join(userData.username, () => {
          let rooms = Object.keys(client.rooms)
          console.log("rooms: ", rooms)
        })
        // create a hash in redis
        redis.hmset(userData.username, {
          username: userData.username,
          _id: userData._id,
          stat: "online"
        })
        // add this hash to userzone set
        redis.sadd("userzones", userData.username)

        // Go through all contacts and send status (including self)
        const user = await User.findById(userData._id)
          .populate("contacts")
          .lean()
        if (user && user.contacts) {
          /* const allContacts = [] */
          const allContacts = user.contacts.map(async item => {
            const username = await redis.hgetall(item.username)
            console.log("username: ", username)
            if (!username.username) {
              return {username: item.username, stat: "offline"}
            } else {
              return redis.hget(userData.username, "stat").then(val => {
                return {
                  avatar: item.avatar,
                  username: item.username,
                  stat: val
                }
              })
            }
          })
          const prom = await Promise.all(allContacts)
          console.log("prom: ", prom)
          cb(prom)
        }
        /* cb({ */
        /*   username: item.username, */
        /*   stat: await redis.hget(userData.username, "stat") */
        /* }) */
      } catch (err) {
        console.log("err: ", err)
      }
    })

    // ZONE EVENTS

    // zone chat
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

    client.on("disconnect", () => {
      console.log("a user disconnected")
      // remove user from zone
      var user = Users.removeUserId(client.id)
      var global = Global.removeUser(client.username)

      if (user) {
        socket
          .to(user.zoneId)
          .emit("usersList", Users.getUsersList(user.zoneId))
      }

      if (global) {
        var globalZone = Global.getZoneList()
        console.log("globalZone: ", globalZone)
        var arr = uniqBy(globalZone, "username")
        console.log("sockert naem: ", client.username)
        const removeUser = remove(arr, client.username)
        console.log("remove user: ", removeUser)
        console.log("arr: ", arr)
        socket.emit("loggedInUser", arr)
      }
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
  })

  return socket
}
