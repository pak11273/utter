import User from "../../api/user/user-model.js"

export const add_contact_handler = socket => (zone, cb) => {
  socket.join(zone.username)

  cb()
}

export const create_userzone_handler = (redis, client, socket) => async (
  userData,
  cb
) => {
  try {
    // join userzone in socket.io by username
    client.join(userData.username, () => {
      let rooms = Object.keys(client.rooms)
    })

    // add room to redis in the USERZONES set by username
    redis.sadd("USERZONES", userData.username)

    // find all of the user's contacts
    const user = await User.findById(userData._id)
      .populate("contacts")
      .lean()

    var UserContactsList = []

    if (user && user.contacts) {
      const allContacts = user.contacts.map(async item => {
        // check if contact is already online
        if (redis.exists(item.username)) {
          // join all contact personal zones
          client.join(item.username)

          // TODO: move to function to find how many clients in a room, for zone cards
          socket
            .of("/")
            .in(item.username)
            .clients((err, clients) => {
              // clients will be array of socket ids , currently available in given room
              console.log("clients of ; " + item.username, clients)
            })

          /*           // TODO: alert all contacts of online status */
          /*           /1* const stat = await redis.hget(item.username, "stat") *1/ */
          /*           /1* console.log("state; ", stat) *1/ */
          /*           /1* client.to(user.username).emit(user.username, stat) *1/ */
        }
        /*         /1* const userzoneExists = await redis.exists(item.username) *1/ */
        /*         // set status to offline if user not in redis (contact hasn't logged in yet) */
        /*         const hasZone = await redis.sismember("USERZONES", item.username) */
        /*         // contact list needed for user hash */
        /*         UserContactsList.push(item.username) */
        /*         /1* if (hasZone) { *1/ */
        /*         /1*   var username = await redis.hgetall(item.username) *1/ */
        /*         /1* } else { *1/ */
        /*         var username = null */
        /*         /1* } *1/ */
        /*         if (username && !username.username) { */
        /*           return {username: item.username, stat: "offline"} */
        /*         } else if (userData && userData.username) { */
        /*           /1* return redis.hget(userData.username, "stat").then(val => { *1/ */
        /*           return redis.hget("hello", "stat").then(val => { */
        /*             return { */
        /*               avatar: item.avatar, */
        /*               username: item.username, */
        /*               stat: val */
        /*             } */
        /*           }) */
        /*         } */
        /*       }) */
        /*       const prom = await Promise.all(allContacts) */
        /*       cb(prom) */
      })
    }

    // create a hash in redis for the user
    redis.hmset(userData.username, {
      username: userData.username,
      contacts: UserContactsList,
      _id: userData._id,
      stat: user.stat
    })
  } catch (err) {
    console.log("err: ", err)
  }
}
