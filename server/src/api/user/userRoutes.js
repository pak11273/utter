import express from 'express'
const router = express.Router()
import controller from './userCtrl.js'
import createRoutes from '../../util/createRoutes.js'

createRoutes(controller, router)

module.exports = router
