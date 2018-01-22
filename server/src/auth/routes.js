import config from '../config/config'
import express from 'express'
import controller from './controller'
import auth from './auth'
import cors from 'cors'

const router = express.Router()
const secrets = config.secrets
const verifyUser = auth.verifyUser

// cors preflight
router.all('*', cors())

// check username and pwd before we send back the jwt
router.post('/signin', verifyUser(), controller.signin)

// alternative code
//
//import jwt from 'express-jwt';
//
// let getTokenFromHeader = (req) => {
//   if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
//     return req.headers.authorization.split(' ')[1];
//   }

//   return null;
// }

// let auth = {
//   required: jwt({
//     secret: secret,
//     userProperty: 'payload',
//     getToken: getTokenFromHeader
//   }),
//   optional: jwt({
//     secret: secret,
//     userProperty: 'payload',
//     credentialsRequired: false,
//     getToken: getTokenFromHeader
//   })
// };
//
// module.exports = auth;

module.exports = router
