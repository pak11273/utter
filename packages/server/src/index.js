import chalk from "chalk"
import http from "http"
import mongoose from "mongoose"
import app from "./server.js"
import config from "./config"
import graphqlServer from "./graphql-server.js"
import {decodeToken, hydrateUser} from "./auth"
import socketServer from "./socketio/socket-server.js"

const server = http.createServer(app)

// socketio instance
socketServer(server)

let currentApp = app

mongoose.set("useFindAndModify", false) // removes deprecation warning
// Routers
mongoose.connection.on("connected", function() {
  // mounts
})

const env = process.env.NODE_ENV || "empty"
console.log(
  chalk.yellow.bgBlue.bold("The current ENV:") +
    " " +
    chalk.greenBright.bold(env)
)

app.get("/", (req, res, next) => {
  res.send("Hello World")
})

// Auth Middleware
// TODO may remove, auth moved to auth-directive
/* app.use(decodeToken(), hydrateUser()) */

graphqlServer.applyMiddleware({
  app
})

server.listen(config.port, function() {
  console.log(
    chalk.white.bgMagenta.bold("listening on port ") +
      " " +
      chalk.greenBright.bold(config.port)
  )
  console.log(
    chalk.white.bgGreen.bold("GraphQL Path ") +
      " " +
      chalk.greenBright.bold(graphqlServer.graphqlPath)
  )
})
