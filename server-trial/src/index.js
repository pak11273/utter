import http from "http"
import config from "./config/index.js"
import app from "./server.js"
import chalk from "chalk"
import graphqlServer from "./graphql-server.js"
import mongoose from "mongoose"

const server = http.createServer(app)
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
