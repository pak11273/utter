import express from "express"
const router = express.Router()
import controller from "./course-ctrl.js"
import createRoutes from "../../utils/create-routes.js"

router.route("/faker").get(controller.faker)

createRoutes(controller, router)

// get teaching courses
router.route("/my-courses/:owner").get(controller.getTeachingCourses)

// custom routes
router.route("/unique").post(controller.unique)

// get current teaching course
router
  .route("/:authId/:owner/:courseId/:title")
  .get(controller.getOne)
  .delete(controller.deleteCourse)
  .put(controller.updateOne)

// delete course level
router
  .route("/my-courses/:owner/:courseId/:title/:levelId")
  .delete(controller.deleteLevel)

// .put(controller.update)

export default router
