import express from 'express'
const router = express.Router()
import controller from './courseCtrl.js'
import Course from './courseModel.js'
import createRoutes from '../../util/createRoutes.js'

createRoutes(controller, router)

// custom routes
router.route('/unique').post(controller.unique)

// get current teaching course
router
  .route('/teaching-course/:courseCreatorId/:courseId/:courseName')
  .get(controller.getOne)
  // .put(controller.putOne)
  .put(controller.update)

// get teaching courses
router.route('/my-courses/:courseCreatorId').get(controller.getTeachingCourses)

router.route('/faker').get(controller.faker)

// .put(controller.update)
// .delete(controller.delete)

module.exports = router
