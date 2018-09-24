import express from 'express'
import controller from './controller'
import cors from 'cors'

const router = express.Router()

// cors preflight
router.all('*', cors())

// contact mail
router.post('/contactmail', controller.contactmail)

// forgot password
router.post('/forgot-password', controller.forgotPassword)
router.post('/reset-password', controller.resetPassword)

export default router
