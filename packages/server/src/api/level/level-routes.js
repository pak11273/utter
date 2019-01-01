import express from "express"
const router = express.Router()
import controller from "./level-ctrl.js"
import createRoutes from "../../utils/create-routes.js"

router.route("/faker").get(controller.faker)

createRoutes(controller, router)

// get teaching levels
router.route("/my-levels/:levelAuthorId").get(controller.getTeachingLevels)

// custom routes
router.route("/unique").post(controller.unique)

// get current teaching level
router
  .route("/:authId/:levelAuthorId/:levelId/:levelName")
  .get(controller.getOne)
  .delete(controller.deleteLevel)
  .put(controller.updateOne)

// delete level level
router
  .route("/my-levels/:levelAuthorId/:levelId/:levelName/:levelId")
  .delete(controller.deleteLevel)

// .put(controller.update)

export default router
