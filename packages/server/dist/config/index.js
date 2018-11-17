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
  env: {},
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