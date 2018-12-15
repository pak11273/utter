import * as DataLoader from "dataloader"
import User from "../api/user/user-model.js"

export const userLoader = () =>
  new DataLoader(async keys => {
    // an array of ids
    // TODO need to find mongoose equivalent of findByIds
    const users = await User.find({id: mongoose.Types.ObjectId(_id)})
      .in(keys)
      .exec()

    const userMap: {[key]: User} = {}

    users.forEach(u => {
      userMap[u.id] = u
    })

    // O(n) * O(1)
    return keys.map(k => userMap[k])
  })
