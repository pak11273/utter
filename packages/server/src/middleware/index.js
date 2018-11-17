require("dotenv").config()
import cors from "cors"
import bluebird from "bluebird"
import bodyParser from "body-parser"
import morgan from "morgan"
import mongoose from "mongoose"
import passport from "passport"

import config from "../config"

export default app => {
  app.use(cors({credentials: true, origin: "http://localhost:8080"}))
  app.use(morgan("dev"))
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  mongoose.Promise = bluebird
  app.use(passport.initialize())
  app.use(passport.session())
  mongoose.connect(
    config.env.DB_HOST,
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
}
