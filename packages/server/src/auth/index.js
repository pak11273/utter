import jwt from "jsonwebtoken"
import expressJwt from "express-jwt"
const jwtDecode = require("jwt-decode")
import config from "../config"
import User from "../api/user/user-model.js"

export const getUserFromJwt = (req, res, next) => {
  const authHeader = req.headers.authorization
  req.user = jwtDecode(authHeader)
  next()
}

// expresss middleware (Deprecating auth in express, moving to graphql)
export const decodeToken = () => {
  return (req, res, next) => {
    if (req.headers.authorization) {
      var token = req.headers.authorization
    }

    if (typeof token !== "undefined" && token !== "null") {
      jwt.verify(token, config.env.JWT, (err, decoded) => {
        if (err) {
          res.status(401).json({
            error: "failed to authenticate"
          })
        } else {
          req.user = {}
          req.user.id = decoded._id
        }
      })
    }
    next()
  }
}

export const hydrateUser = (req, res, next) => {
  return (req, res, next) => {
    next()
  }
}

export const getFreshUser = () => {
  return (req, res, next) => {
    User.findById(req.user._id).then(
      user => {
        if (!user) {
          /* if no user was found it was a valid jwt token but no user was found with the id provided.  Either the user was deleted or the jwt was from another source.
           */
          res.status(401).send("UnAuthorized")
        } else {
          console.log("req: ", req.user)
          req.user = user
          next()
        }
      },
      function(err) {
        next(err)
      }
    )
  }
}

export const verifyUser = () => {
  return (req, res, next) => {
    let {identifier, password} = req.body
    // checks input for email or username
    let criteria =
      identifier.indexOf("@") === -1
        ? {username: identifier}
        : {email: identifier}
    if (!identifier || !password) {
      return res.status(400).send("username/email or password cannot be blank")
    }
    // check if passwords match
    User.findOne(criteria).then(
      user => {
        if (!user) {
          res.status(401).json({errors: {form: "Invalid Credentials"}})
        } else {
          // use authenticate() on user.doc, pass in the posted password, hash it and check
          if (!user.authenticate(password)) {
            console.log("auth: ", user.authenticate(password))
            console.log("user not authenticated???")
            res.status(401).json({errors: {form: "Invalid Credentials"}})
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

// another way to authenticate tokens and grab the user
export const authenticate = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"]
  let token
  if (authorizationHeader) {
    token = authorizationHeader.split(" ")[1]
  }
  if (token) {
    jwt.verify(token, config.env.JWT, (err, decoded) => {
      if (err) {
        res.status(401).json({
          error: "failed to authenticate"
        })
      } else {
        User.findOne({_id: decoded._id}, "_id username email").then(
          user => {
            if (!user) {
              res.status(404).json({error: "No such user"})
            }
            req.currentUser = user
            next()
          },
          err => {
            next(err)
          }
        )
      }
    })
  } else {
    res.status(403).json({
      error: "No token provided"
    })
  }
}

// util method to sign tokens on signup
export const signToken = id => {
  return jwt.sign({_id: id}, config.env.JWT)
}

export const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization")
  if (!authHeader) {
    req.isAuth = false
    return next()
  }

  let decodedToken

  try {
    decodedToken = jwt.verify(authHeader, config.env.JWT)
  } catch (err) {
    req.isAuth = false
    return next()
  }

  if (!decodedToken) {
    req.isAuth = false
    return next()
  }

  req.isAuth = true
  /* req.userId = decodedToken.userId */
  req.token = decodedToken
  next()
}
