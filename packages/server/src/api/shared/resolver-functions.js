import jwt from "jsonwebtoken"
import config from "../../config"
import User from "../user/user-model.js"

/* 
** 
** @userByToken 
**
** usage: 
** userByToken(token, (err, res) => {} 
**
** notes: check for token first
**
** const token = ctx.req.headers.authorization
** if (token === "null") {
**   return new Error("You need to be registered to view this resource.")
** }
**
*/
export const userByToken = async (token, cb) => {
  const response = await jwt.verify(token, config.env.JWT, (err, decoded) => {
    if (err) return err
    if (decoded) {
      const userID = decoded._id
      const user = User.findOne({_id: userID}).exec()
      return user
    }
  })

  if (response === Error) {
    var err = response
  } else {
    err = null
  }

  return cb(err, response)
}
