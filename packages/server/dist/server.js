"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _api = require("./api");

var _api2 = _interopRequireDefault(_api);

var _mailRoutes = require("./mail/mail-routes");

var _mailRoutes2 = _interopRequireDefault(_mailRoutes);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _middleware = require("./middleware");

var _middleware2 = _interopRequireDefault(_middleware);

var _expressHandlebars = require("express-handlebars");

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _expressRateLimit = require("express-rate-limit");

var _expressRateLimit2 = _interopRequireDefault(_expressRateLimit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* import RedisStore from "rate-limit-redis" */

// This code shows all console.log locations
// https://remysharp.com/2014/05/23/where-is-that-console-log
// if (process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "prod") {
if (!["production", "prod"].includes(process.env.NODE_ENV)) {
  ;["log", "warn"].forEach(function (method) {
    var old = console[method];
    console[method] = function () {
      var stack = new Error().stack.split(/\n/);
      // Chrome includes a single "Error" line, FF doesn't.
      if (stack[0].indexOf("Error") === 0) {
        // stack = stack.slice(1)
        stack = stack.slice(1);
      }
      var args = [].slice.apply(arguments).concat([stack[1].trim()]);
      return old.apply(console, args);
    };
  });
}
/* import {redis} from "./graphql-server" */


var app = (0, _express2.default)();

(0, _middleware2.default)(app);

// rate limiter

/* const limiter = new RateLimit({ */
/*   store: new RedisStore({ */
/*     // see Configuration */
/*     client: redis */
/*   }), */
/*   windowMs: 15 * 60 * 1000, // 15 minutes */
/*   max: 100, // limit each IP to 100 requests per windowMs */
/*   delayMs: 0 // disable delaying - full speed until the max limit is reached */
/* }) */

//  apply to all requests
/* app.use(limiter) */

// Routers
_mongoose2.default.connection.on("connected", function () {
  app.use("/api", _api2.default);
  app.use("/mail", _mailRoutes2.default);
});

// handlebars setup
var hbs = _expressHandlebars2.default.create({
  // config
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", _path2.default.resolve(__dirname, "../src/views/layouts"));

var _default = app;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(app, "app", "src/server.js");
  reactHotLoader.register(hbs, "hbs", "src/server.js");
  reactHotLoader.register(_default, "default", "src/server.js");
  leaveModule(module);
})();

;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(app, "app", "src/server.js");
  reactHotLoader.register(hbs, "hbs", "src/server.js");
  reactHotLoader.register(_default2, "default", "src/server.js");
  leaveModule(module);
})();

;