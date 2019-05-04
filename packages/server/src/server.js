import mongoose from "mongoose"
import chalk from "chalk"
import path from "path"
import {redis} from "./graphql-server"
import apiRouter from "./api/index.js"
import config from "./config"
import express from "express"
import middleware from "./middleware"
import exphbs from "express-handlebars"
import RateLimit from "express-rate-limit"
import RedisStore from "rate-limit-redis"
import session from "express-session"
import stripe from "./stripe.js"
var RedisStore2 = require("connect-redis")(session)

// This code shows all console.log locations
// https://remysharp.com/2014/05/23/where-is-that-console-log
// if (process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "prod") {
if (!["production", "prod"].includes(process.env.NODE_ENV)) {
  ;["log", "warn"].forEach(function(method) {
    var old = console[method]
    console[method] = function() {
      var stack = new Error().stack.split(/\n/)
      // Chrome includes a single "Error" line, FF doesn't.
      if (stack[0].indexOf("Error") === 0) {
        // stack = stack.slice(1)
        stack = stack.slice(1)
      }
      var args = [].slice.apply(arguments).concat([stack[1].trim()])
      return old.apply(console, args)
    }
  })
}

const app = express()

/* app.use( */
/*   session({ */
/*     secret: config.sessionSecret, */
/*     resave: false, */
/*     saveUninitialized: false */
/*   }) */
/* ) */

app.use(
  session({
    store: new RedisStore2({client: redis}),
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false
  })
)

// TODO: may need to add this to session optins for production
/* cookie: { */
/*   httpOnly: */
/*     process.env.NODE_ENV === "prod" || process.env.NODE_ENV === "production" */
/*       ? false : true */
/* }, */

middleware(app)

// rate limiter

const limiter = new RateLimit({
  store: new RedisStore({
    // see Configuration
    client: redis
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
})

//  apply to all requests
app.use(limiter)

// Routers
mongoose.connection.on("connected", function() {
  app.use("/api", apiRouter) // moved to index
})

// handlebars setup
const hbs = exphbs.create({
  // config
})

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname, "../src/views/layouts"))

export default app
