import dot from "dotenv"
dot.config()
import {merge} from "lodash"

// if env not set, set it to default
const env = process.env.NODE_ENV || "development"

// default config object
// export default {
const baseConfig = {
  port: process.env.PORT || 3001,
  secrets: {
    JWT: process.env.JWT,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET,
    CDN_IMAGE_UPLOAD: process.env.CDN_IMAGE_UPLOAD,
    CDN_VIDEO_UPLOAD: process.env.CDN_VIDEO_UPLOAD,
    CDN_URL: process.env.CDN_URL,
    DB_HOST: process.env.MONGO_URL,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    FACEBOOK_CALLBACK_URL: process.env.FACEBOOK_CALLBACK_URL,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    GOOGLE_CLIENTID: process.env.GOOGLE_CLIENTID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    PIXABAY_SECRET: process.env.PIXABAY_SECRET,
    YANDEX_SECRET: process.env.YANDEX_SECRET
  },
  expireTime: 24 * 60 * 10, // 10 days expiration
  db: {
    url: "mongodb://localhost:27017/utter-dev"
  }
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
