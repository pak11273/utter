import express from "express"
import userRouter from "./user/user-routes.js"
import courseRouter from "./course/course-routes.js"
const router = express()

router.use("/users", userRouter)
router.use("/courses", courseRouter)

export default router
