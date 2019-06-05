"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _lodash = require("lodash");

var _chalk = _interopRequireDefault(require("chalk"));

_dotenv["default"].config();

var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
var env = process.env.NODE_ENV || "development";
var baseConfig = {
  appName: process.env.APP_NAME,
  appURL: process.env.APP_URL,
  sessionSecret: process.env.EXPRESS_SESSION_SECRET,
  port: process.env.PORT || 3010,
  env: {},
  expireTime: 24 * 60 * 10
};
baseConfig.env = process.env.NODE_ENV;
var envConfig;

switch (env) {
  case "development":
  case "dev":
    envConfig = require("./development.js")["default"];
    break;

  case "testing":
  case "test":
    envConfig = require("./testing.js")["default"];
    break;

  case "production":
  case "prod":
    envConfig = require("./production.js")["default"];
    break;

  case "staging":
  case "stage":
    envConfig = require("./staging.js")["default"];
    break;

  default:
    envConfig = require("./development.js")["default"];
}

var _default = (0, _lodash.merge)(baseConfig, envConfig || {});

exports["default"] = _default;