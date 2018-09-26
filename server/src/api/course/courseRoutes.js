import express from 'express'
const router = express.Router()
import controller from './courseCtrl.js'
import createRoutes from '../../util/createRoutes.js'
import {roleCheck} from '../../acl/middleware.js'

createRoutes(controller, router)

// get teaching courses
router
  .route('/my-courses/:courseAuthorId')
  .get(roleCheck, controller.getTeachingCourses)

// custom routes
router.route('/unique').post(controller.unique)

// get current teaching course
router
  .route('/:authId/:courseAuthorId/:courseId/:courseName')
  .get(controller.getOne)
  .delete(controller.deleteCourse)
  .put(controller.updateOne)

// delete course level
router
  .route('/my-courses/:courseAuthorId/:courseId/:courseName/:levelId')
  .delete(controller.deleteLevel)

router.route('/faker').get(controller.faker)

// .put(controller.update)

export default router
