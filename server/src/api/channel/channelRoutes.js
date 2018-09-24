import express from 'express'
import controller from './channelCtrl.js'
import createRoutes from '../../util/createRoutes.js'
const router = express.Router()

createRoutes(controller, router)

export default router
