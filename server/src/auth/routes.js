import config from '../config/index.js'
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
router.get('/google', controller.getGoogleLogin)
router.get('/google/callback', controller.googleLogin)

module.exports = router
