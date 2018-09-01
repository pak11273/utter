import express from 'express'
const router = express.Router()
import controller from './courseCtrl.js'
import createRoutes from '../../util/createRoutes.js'
import acl from '../../acl/middleware.js'

createRoutes(controller, router)

// get teaching courses
router
  .route('/my-courses/:courseAuthorId')
  .get(acl.roleCheck, controller.getTeachingCourses)

// custom routes
router.route('/unique').post(controller.unique)

// get current teaching course
router
  .route('/teaching-course/:courseAuthorId/:courseId/:courseName')
  .get(controller.getOne)
  .put(controller.update)

// delete course level
router
  .route('/teaching-course/:courseAuthorId/:courseId/:courseName/:levelId')
  .delete(controller.deleteLevel)

router.route('/faker').get(controller.faker)

// .put(controller.update)

module.exports = router
