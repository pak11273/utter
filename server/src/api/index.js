import express from 'express'
import userRoutes from './user/userRoutes.js'
import languageRoutes from './language/languageRoutes.js'
const router = express.Router()

router.use('/users', userRoutes)
router.use('/languages', languageRoutes)

module.exports = router
