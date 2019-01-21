import jwt from "jsonwebtoken"
import config from "../../config"
import User from "../user/user-model.js"

export const userByToken = ctx => {
  var token = ctx.req.headers.authorization || null
  if (token) {
    const result = jwt.verify(token, config.env.JWT, (err, decoded) => {
      if (err) return err
      if (decoded) {
        const userID = decoded._id
        const user = User.findOne({_id: userID}).exec()
        return user
      } else {
        return false
      }
    })
    return result
  }
}
