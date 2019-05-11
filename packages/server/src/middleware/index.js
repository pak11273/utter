require("dotenv").config()
import cors from "cors"
import bluebird from "bluebird"
import bodyParser from "body-parser"
import morgan from "morgan"
import mongoose from "mongoose"
import passport from "passport"

import config from "../config"

export default app => {
  var whitelist = [
    "https://utterzone.com",
    "https://www.utterzone.com",
    "http://192.168.68.8:8080"
  ]
  var corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
      if (whitelist.includes(origin)) return callback(null, true)

      callback(new Error("Not allowed by CORS"))
    },
    methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS"]
  }
  app.options("*", cors(corsOptions))
  app.use(cors(corsOptions))
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
