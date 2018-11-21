"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _merge = require("lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();


// if env not set, set it to default
var env = process.env.NODE_ENV || "development";

var baseConfig = {
  appName: process.env.APP_NAME,
  appURL: process.env.APP_URL,
  port: process.env.PORT || 3010,
  env: {
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
  expireTime: 24 * 60 * 10 // 10 days expiration


  // set config env to node_env
};baseConfig.env = process.env.NODE_ENV;

var envConfig = void 0;

switch (env) {
  case "development":
  case "dev":
    envConfig = require("./development.js").default;
    break;
  case "testing":
  case "test":
    envConfig = require("./testing.js").default;
    break;
  case "production":
  case "prod":
    envConfig = require("./production.js").default;
    break;
  case "staging":
  case "stage":
    envConfig = require("./staging.js").default;
    break;
  default:
    envConfig = require("./development.js").default;
}

// merge the two objects and export it so our app can use it
exports.default = (0, _merge2.default)(baseConfig, envConfig || {});