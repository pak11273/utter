import express from "express"
const router = express.Router()
import controller from "./course-ctrl.js"

router.route("/faker").get(controller.faker)

export default router
