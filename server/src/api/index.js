import express from 'express'
import userRoutes from './user/userRoutes.js'
import languageRoutes from './language/languageRoutes.js'
import eventRoutes from './event/eventRoutes.js'
const router = express.Router()

router.use('/users', userRoutes)
router.use('/languages', languageRoutes)
router.use('/events', eventRoutes)

module.exports = router
