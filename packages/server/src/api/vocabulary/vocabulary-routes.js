import express from "express"
const router = express.Router()
import controller from "./level-ctrl.js"
import createRoutes from "../../utils/create-routes.js"

router.route("/faker").get(controller.faker)

createRoutes(controller, router)

// get teaching vocabulary
router.route("/my-vocabulary/:levelAuthorId").get(controller.getTeachingVocabulary)

// custom routes
router.route("/unique").post(controller.unique)

// get current teaching level
router
  .route("/:authId/:levelAuthorId/:levelId/:levelName")
  .get(controller.getOne)
  .delete(controller.deleteVocabulary)
  .put(controller.updateOne)

// delete level level
router
  .route("/my-vocabulary/:levelAuthorId/:levelId/:levelName/:levelId")
  .delete(controller.deleteVocabulary)

// .put(controller.update)

export default router
