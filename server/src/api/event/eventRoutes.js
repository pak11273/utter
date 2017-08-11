import express from 'express'
const router = express.Router()
import controller from './eventCtrl.js'
import createRoutes from '../../util/createRoutes.js'
import {decodeToken, getFreshUser, authenticate} from '../../auth/auth.js'

// createRoutes(controller, router)

router.route('/').post(authenticate, function(req, res) {
  res.status(201).json({
    success: true
  })
})

module.exports = router
