import express from 'express'
import userRoutes from './user/userRoutes.js'
import channelRoutes from './channel/channelRoutes.js'
import languageRoutes from './language/languageRoutes.js'
import zoneRoutes from './zone/zoneRoutes.js'
import roomRoutes from './room/roomRoutes.js'
// import commentRoutes from './comment/commentRoutes.js'
import messageRoutes from './message/messageRoutes.js'
const router = express.Router()

router.use('/users', userRoutes)
router.use('/languages', languageRoutes)
router.use('/channels', channelRoutes)
// router.use('/zones', zoneRoutes)
router.use('/rooms', roomRoutes)
// router.use('/comments', commentRoutes)
router.use('/messages', messageRoutes)

module.exports = router
