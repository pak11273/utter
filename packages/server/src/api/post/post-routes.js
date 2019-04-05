import express from "express"
const router = express.Router()
import controller from "./post-ctrl.js"
import createRoutes from "../../utils/create-routes.js"

router.route("/faker").get(controller.faker)

createRoutes(controller, router)

// get teaching posts
router.route("/my-posts/:postAuthorId").get(controller.getTeachingPosts)

// custom routes
router.route("/unique").post(controller.unique)

// get current teaching post
router
  .route("/:authId/:postAuthorId/:postId/:postName")
  .get(controller.getOne)
  .delete(controller.deletePost)
  .put(controller.updateOne)

// delete post post
router
  .route("/my-posts/:postAuthorId/:postId/:postName/:postId")
  .delete(controller.deletePost)

// .put(controller.update)

export default router
