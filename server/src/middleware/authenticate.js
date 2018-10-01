import jwt from 'jsonwebtoken'
import config from '../config/index.js'
import User from '../api/user/userModel.js'

export default (req, res, next) => {
  const authorizationHeader = req.headers['authorization']
  let token
  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1]
  }

  if (token) {
    jwt.verify(token, config.secrets.JWT, (err, decoded) => {
      if (err) {
        res.status(401).json({
          error: 'failed to authenticate'
        })
      } else {
        next()
      }
    })
  } else {
    res.status(403).json({
      error: 'No token provided'
    })
  }
}
