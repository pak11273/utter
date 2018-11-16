import express from 'express'
import controller from './messageCtrl.js'
import createRoutes from '../../util/createRoutes.js'
const router = express.Router()

createRoutes(controller, router)

export default router
