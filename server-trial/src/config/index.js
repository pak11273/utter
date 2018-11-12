import dot from "dotenv"
dot.config()
import merge from "lodash/merge"

// if env not set, set it to default
const env = process.env.NODE_ENV || "development"

// default config object
// export default {

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
