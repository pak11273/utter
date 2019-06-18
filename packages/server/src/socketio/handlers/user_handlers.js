import User from "../../api/user/user-model.js"

export const add_contact_handler = socket => (zone, cb) => {
  socket.join(zone.username)

  cb()
}

export const create_userzone_handler = (redis, client) => async (
  userData,
  cb
) => {
  try {
    // join userzone
    client.join(userData.username, () => {
      let rooms = Object.keys(client.rooms)
    })

    // add this hash to userzone set
    redis.sadd("userzones", userData.username)

    // Go through all contacts and send status (including self)
    const user = await User.findById(userData._id)
      .populate("contacts")
      .lean()

    var UserContactsList = []
    if (user && user.contacts) {
      const allContacts = user.contacts.map(async item => {
        UserContactsList.push(item.username)
        const username = await redis.hgetall(item.username)
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
      cb(prom)
    }

    // create a hash in redis
    redis.hmset(userData.username, {
      username: userData.username,
      contacts: UserContactsList,
      _id: userData._id,
      stat: "online"
    })

    /* cb({ */
    /*   username: item.username, */
    /*   stat: await redis.hget(userData.username, "stat") */
    /* }) */
  } catch (err) {
    console.log("err: ", err)
  }
}
