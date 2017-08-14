import express from 'express'
import controller from './commentCtrl.js'
import createRoutes from '../../util/createRoutes.js'
const router = express.Router()

createRoutes(controller, router)

module.exports = router
