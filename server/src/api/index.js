import express from 'express'
import dictionaryRoutes from './dictionary/dictionaryRoutes.js'
import userRoutes from './user/userRoutes.js'
import channelRoutes from './channel/channelRoutes.js'
import courseRoutes from './course/courseRoutes.js'
import languageRoutes from './language/languageRoutes.js'
import phraseRoutes from './phrases/phraseRoutes.js'
import zoneRoutes from './zone/zoneRoutes.js'
import roomRoutes from './room/roomRoutes.js'
// import commentRoutes from './comment/commentRoutes.js'
import messageRoutes from './message/messageRoutes.js'
const router = express.Router()

router.use('/channels', channelRoutes)
// router.use('/comments', commentRoutes)
router.use('/courses', courseRoutes)
router.use('/dictionary', dictionaryRoutes)
router.use('/languages', languageRoutes)
router.use('/messages', messageRoutes)
router.use('/phrases', phraseRoutes)
router.use('/rooms', roomRoutes)
router.use('/users', userRoutes)
// router.use('/zones', zoneRoutes)

export default router
