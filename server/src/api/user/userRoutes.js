import express from 'express'
const router = express.Router()
import controller from './userCtrl.js'
import logger from '../../util/logger'
import {decodeToken, getFreshUser} from '../../auth/auth.js'
const checkUser = [decodeToken(), getFreshUser()]

router.param('id', controller.params)

router
  .route('/')
  .get(controller.get)
  .post(controller.post)

router
  .route('/:id')
  .get(controller.getOne)
  .put(controller.update)
  .delete(controller.delete)

module.exports = router
