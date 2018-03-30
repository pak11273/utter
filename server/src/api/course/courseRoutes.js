import express from 'express'
const router = express.Router()
import controller from './courseCtrl.js'
import Course from './courseModel.js'
import createRoutes from '../../util/createRoutes.js'

createRoutes(controller, router)

// custom routes
router.route('/unique').post(controller.unique)

// get teaching courses
router.route('/my-courses/:courseCreatorId').get(controller.getTeachingCourses)
// .put(controller.update)
// .delete(controller.delete)

module.exports = router
