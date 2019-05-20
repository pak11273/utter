import chalk from "chalk"
import http from "http"
import mongoose from "mongoose"
import User from "./api/user/user-model.js"
import app from "./server.js"
import config from "./config"
import graphqlServer from "./graphql-server.js"
import {decodeToken, hydrateUser} from "./auth"
/* import socketZoneChat from "./socketio/socket-server.js" */
import socketZoneChat from "./socketio/group-chat.js"
import socketContactRequest from "./socketio/send-request.js"
import {isAuth} from "./auth"

const server = http.createServer(app)

// socketio instances
socketZoneChat(server)
socketContactRequest(server)

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

app.get("/confirm/:id", async (req, res, next) => {
  const {id} = req.params
  const userId = redis.get(id)
  if (userId) {
    await User.update({id: userId}, {confirmed: true})
    res.send("ok")
  } else {
    res.send("invalid")
  }
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
