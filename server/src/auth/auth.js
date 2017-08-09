import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from '../config/config'
import User from '../api/user/userModel'

const checkToken = expressJwt({secret: config.secrets.jwt})

exports.decodeToken = () => {
  return (req, res, next) => {
    // make optional to place token on query string
    // if it is, place in header
    // use 'Bearer 2342342342' format so checkToken can see it
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token
    }

    // call next if token is valid, send error if not, attaches decoded token to req.user
    checkToken(req, res, next)
  }
}

exports.getFreshUser = () => {
  return (req, res, next) => {
    // we use decodeToken before this function in the middleware stack
    // to have access to req.user here
  }
}

exports.verifyUser = () => {
  return (req, res, next) => {
    let {identifier, password} = req.body
    let criteria = identifier.indexOf('@') === -1
      ? {username: identifier}
      : {email: identifier}
    // if no username or password then stop
    if (!identifier || !password) {
      return res.status(400).send('You need a username/email and password')
    }
    // check if passwords match
    User.findOne(criteria).then(
      user => {
        if (!user) {
          res.status(401).json({errors: {form: 'Invalid Credentials'}})
        } else {
          // use authenticate() on user.doc, pass in the posted password, hash it and check
          if (!user.authenticate(password)) {
            res.status(401).json({errors: {form: 'Invalid Credentials'}})
          } else {
            // if everything is good then attach to req.user
            // and call next() so the controller can sign a token form the req.user_id
            req.user = user
            next()
          }
        }
      },
      err => {
        next(err)
      }
    )
  }
}

// util method to sign tokens on signup
exports.signToken = id => {
  return jwt.sign({_id: id}, config.secrets.jwt, {expiresIn: config.expireTime})
}
