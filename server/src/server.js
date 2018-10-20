import path from "path"
import logger from "./util/logger"
import error from "./middleware/error"
import config from "./config/index.js"
import pwd from "./config/pwd.js"
import mongoose from "mongoose"
import nodemailer from "nodemailer"
import _ from "lodash"
import express from "express"
import err from "./middleware/error.js"
import api from "./api"
import auth from "./auth/routes.js"
import admin from "./admin/adminRoutes.js"
import mailRouter from "./mail/routes.js"
import {graphiqlExpress} from "apollo-server-express"
import {graphQLRouter} from "./graphQLRouter.js"
const app = express()

// third party middleware
import middleware from "./middleware/appMiddleware"
middleware(app)

// express middleware
app.use(express.static(path.join(__dirname, "client/dist"))) //path is relative to this directory
app.use("/cdn", express.static("cdn"))

// Routers
mongoose.connection.on("connected", function() {
  // mounts
  app.use("/graphql", graphQLRouter)
  app.use("/api", api)
  app.use("/admin", admin)
  app.use("/auth", auth)
  app.use("/mail", mailRouter)
  app.use("/docs", graphiqlExpress({endpointURL: "./graphql"}))
})

// used for gzipping bundle.js
app.get("*.js", function(req, res, next) {
  req.url = req.url + ".gz"
  res.set("Content-Encoding", "gzip")
  res.set("Content-Type", "text/javascript")
  next()
})

app.get("*.css", function(req, res, next) {
  req.url = req.url + ".gz"
  res.set("Content-Encoding", "gzip")
  res.set("Content-Type", "text/css")
  next()
})

// This is used to refresh browser for SPA
// https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writting-manually
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"), function(
    err
  ) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

// seed the db with dummy data TODO: change the seeding before using this
// if (config.seed) {
//   require('./util/seed')
// }

// error handling middleware
app.use(err)

export default app
