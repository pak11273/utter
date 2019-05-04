import express from "express"
const router = express.Router()
import controller from "./zone-ctrl.js"
import createRoutes from "../../utils/create-routes.js"

router.route("/faker").get(controller.faker)

/* createRoutes(controller, router) */

export default router
