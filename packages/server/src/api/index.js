import express from "express"
import userRouter from "./user/user-routes.js"
import courseRouter from "./course/course-routes.js"
import zoneRouter from "./zone/zone-routes.js"
import levelRouter from "./level/level-routes.js"
const router = express()

router.use("/users", userRouter)
router.use("/courses", courseRouter)
router.use("/levels", levelRouter)
router.use("/zones", zoneRouter)

export default router
