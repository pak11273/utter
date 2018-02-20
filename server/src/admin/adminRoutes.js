import express from 'express'
const router = express.Router()
import controller from './adminCtrl.js'

router.route('/uploadFile').post(controller.uploadFile)

router.route('/language').post(controller.newLanguage)

module.exports = router
