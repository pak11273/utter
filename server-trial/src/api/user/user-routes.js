import express from "express"
import {confirmationEmail, forgotPasswordEmail} from "./user-ctrl"

const router = express.Router()

router.get("/confirm/:id", confirmationEmail)
router.get("/change-password/:id", forgotPasswordEmail)

export default router
