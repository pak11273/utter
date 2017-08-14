import express from 'express'
import controller from './zoneCtrl.js'
import createRoutes from '../../util/createRoutes.js'
const router = express.Router()

createRoutes(controller, router)

// router.get('/:resource', function(req, res, next) {
//   res.json({
//     confirmation: true,
//     resource: req.params.resource
//   })
// })

module.exports = router
