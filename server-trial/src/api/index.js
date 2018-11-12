import express from "express"
import userRouter from "./user/user-routes.js"
const router = express()

router.use("/users", userRouter)

export default router
