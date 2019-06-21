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

    // Go through all contacts and get online stats (including self)
    const user = await User.findById(userData._id)
      .populate("contacts")
      .lean()

    var UserContactsList = []
    if (user && user.contacts) {
      const allContacts = user.contacts.map(async item => {
        // TODO: create redis zones and socket rooms for each contact and join them
        console.log("type: ", typeof user.username)
        client.join(user.username)
        redis.sadd(item.username, user.username)

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

    // create a hash in redis for the user
    redis.hmset(userData.username, {
      username: userData.username,
      contacts: UserContactsList,
      _id: userData._id,
      stat: "online"
    })
  } catch (err) {
    console.log("err: ", err)
  }
}
