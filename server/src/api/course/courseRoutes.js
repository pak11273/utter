import express from 'express'
const router = express.Router()
import controller from './courseCtrl.js'
import createRoutes from '../../util/createRoutes.js'

createRoutes(controller, router)

// custom routes
router.route('/unique').post(controller.unique)

// get current teaching course
router
  .route('/teaching-course/:courseCreatorId/:courseId/:courseName')
  .get(controller.getOne)
  .put(controller.update)

// delete course level
router
  .route('/teaching-course/:courseCreatorId/:courseId/:courseName/:levelId')
  .delete(controller.deleteLevel)

// get teaching courses
router.route('/my-courses/:courseCreatorId').get(controller.getTeachingCourses)

router.route('/faker').get(controller.faker)

// .put(controller.update)

module.exports = router
