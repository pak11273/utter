require("dotenv").config()
import cors from "cors"
import bluebird from "bluebird"
import bodyParser from "body-parser"
import morgan from "morgan"
import mongoose from "mongoose"
import passport from "passport"

import config from "../config"
export default app => {
  app.use(
    cors({
      origin: "https://utterzone.com",
      credentials: true
    })
  )
  app.use(morgan("dev"))
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  mongoose.Promise = Promise
  app.use(passport.initialize())
  app.use(passport.session())
  mongoose
    .connect(
      config.env.DB_HOST,
      {
        useCreateIndex: true,
        useNewUrlParser: true
      }
    )
    .then()
    .catch(err => {
      console.log("mongoose error: ", err)
    })
}
