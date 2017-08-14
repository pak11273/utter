import express from 'express'
import userRoutes from './user/userRoutes.js'
import languageRoutes from './language/languageRoutes.js'
import eventRoutes from './event/eventRoutes.js'
import zoneRoutes from './zone/zoneRoutes.js'
import commentRoutes from './comment/commentRoutes.js'
const router = express.Router()

router.use('/users', userRoutes)
router.use('/languages', languageRoutes)
router.use('/events', eventRoutes)
router.use('/zones', zoneRoutes)
router.use('/comments', commentRoutes)

module.exports = router
