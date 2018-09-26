import express from 'express'
const router = express.Router()
import controller from './userCtrl.js'
import logger from '../../util/logger'
import createRoutes from '../../util/createRoutes.js'
import {decodeToken, getFreshUser} from '../../auth/auth.js'
const checkUser = [decodeToken(), getFreshUser()]

createRoutes(controller, router)

router.param('id', controller.findByParams)

router
  .route('/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.remove)

export default router
