import chalk from "chalk"
import http from "http"
import mongoose from "mongoose"
import app from "./server.js"
import config from "./config"
import graphqlServer from "./graphql-server.js"
import {decodeToken, hydrateUser} from "./auth"
import socketServer from "./socketio/socket-server.js"
import {isAuth} from "./auth"

const server = http.createServer(app)

// socketio instance
socketServer(server)

let currentApp = app

mongoose.set("useFindAndModify", false) // removes deprecation warning

const env = process.env.NODE_ENV || "empty"
console.log(
  chalk.yellow.bgBlue.bold("The current ENV:") +
    " " +
    chalk.greenBright.bold(env)
)

app.get("/", (req, res, next) => {
  res.send(
    "Hi.  Your ip addresses was just recorded and put on our watchlist. Please be advised that we will be monitoring this ip addreass and logging it's activities on our server.  Enjoy the rest of your day."
  )
})

// Auth Middleware
// TODO may remove, we are using auth-directive too
app.use(isAuth)

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
