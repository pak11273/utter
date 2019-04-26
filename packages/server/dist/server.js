"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _chalk = _interopRequireDefault(require("chalk"));

var _path = _interopRequireDefault(require("path"));

var _graphqlServer = require("./graphql-server");

var _api = _interopRequireDefault(require("./api"));

var _config = _interopRequireDefault(require("./config"));

var _express = _interopRequireDefault(require("express"));

var _middleware = _interopRequireDefault(require("./middleware"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

var _rateLimitRedis = _interopRequireDefault(require("rate-limit-redis"));

var _expressSession = _interopRequireDefault(require("express-session"));

// This code shows all console.log locations
// https://remysharp.com/2014/05/23/where-is-that-console-log
// if (process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "prod") {
if (!["production", "prod"].includes(process.env.NODE_ENV)) {
  ;
  ["log", "warn"].forEach(function (method) {
    var old = console[method];

    console[method] = function () {
      var stack = new Error().stack.split(/\n/); // Chrome includes a single "Error" line, FF doesn't.

      if (stack[0].indexOf("Error") === 0) {
        // stack = stack.slice(1)
        stack = stack.slice(1);
      }

      var args = [].slice.apply(arguments).concat([stack[1].trim()]);
      return old.apply(console, args);
    };
  });
}

var app = (0, _express.default)();
app.use((0, _expressSession.default)({
  secret: _config.default.sessionSecret,
  resave: false,
  saveUninitialized: false
}));
(0, _middleware.default)(app); // rate limiter

var limiter = new _expressRateLimit.default({
  store: new _rateLimitRedis.default({
    // see Configuration
    client: _graphqlServer.redis
  }),
  windowMs: 15 * 60 * 1000,
  // 15 minutes
  max: 100,
  // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached

}); //  apply to all requests

app.use(limiter); // Routers

_mongoose.default.connection.on("connected", function () {
  app.use("/api", _api.default);
}); // handlebars setup


var hbs = _expressHandlebars.default.create({// config
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", _path.default.resolve(__dirname, "../src/views/layouts"));
var _default = app;
exports.default = _default;