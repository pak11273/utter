import User from '../api/user/userModel'
import auth from './auth'
import mailRouter from '../util/mail.js'

const signToken = auth.signToken

exports.signin = (req, res, next) => {
  // req.user will be there from middleware verify user
  // create a token and send back to the client to consume
  let token = signToken(req.user._id)
  res.json({token: token})
}
