import express from "express"
const router = express.Router()
import controller from "./userCtrl.js"
import logger from "../../util/logger"
import createRoutes from "../../util/createRoutes.js"
import {decodeToken, getFreshUser} from "../../auth"
const checkUser = [decodeToken(), getFreshUser()]

createRoutes(controller, router)

export default router
