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
      credentials: true,
      origin: "https://utterzone.com"
      /* origin: */
      /*   process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod" */
      /*     ? [ */
      /*         "https://utterzone.com", */
      /*         /\.utterzone\.com$/, */
      /*         "https://utterzone.com:80", */
      /*         "https://utterzone:443" */
      /*       ] : ["http://localhost:8080", "http://192.168.68.8:8080"] */
    })
  )
  /* app.options("/graphql") */
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
