import dot from "dotenv"
dot.config()
import {merge} from "lodash"
import chalk from "chalk"
var cloudinary = require("cloudinary").v2

console.log("api cloudname: ", process.env.CLOUDINARY_CLOUD_NAME)
console.log("api secret: ", process.env.CLOUDINARY_API_SECRET)
console.log("api key: ", process.env.CLOUDINARY_API_KEY)

// setup globals
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// if env not set, set it to default
const env = process.env.NODE_ENV || "development"

const baseConfig = {
  appName: process.env.APP_NAME,
  appURL: process.env.APP_URL,
  port: process.env.PORT || 3010,
  env: {},
  expireTime: 24 * 60 * 10 // 10 days expiration
}

// set config env to node_env
baseConfig.env = process.env.NODE_ENV

let envConfig

switch (env) {
  case "development":
  case "dev":
    envConfig = require("./development.js").default
    break
  case "testing":
  case "test":
    envConfig = require("./testing.js").default
    break
  case "production":
  case "prod":
    envConfig = require("./production.js").default
    break
  case "staging":
  case "stage":
    envConfig = require("./staging.js").default
    break
  default:
    envConfig = require("./development.js").default
}

// merge the two objects and export it so our app can use it
export default merge(baseConfig, envConfig || {})
