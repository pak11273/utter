"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _chalk = _interopRequireDefault(require("chalk"));

var _path = _interopRequireDefault(require("path"));

var _graphqlServer = require("./graphql-server");

var _index = _interopRequireDefault(require("./api/index.js"));

var _config = _interopRequireDefault(require("./config"));

var _express = _interopRequireDefault(require("express"));

var _middleware = _interopRequireDefault(require("./middleware"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

var _rateLimitRedis = _interopRequireDefault(require("rate-limit-redis"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _stripe = _interopRequireDefault(require("./stripe.js"));

var MongoStore = require("connect-mongo")(_expressSession["default"]);

if (!["production", "prod"].includes(process.env.NODE_ENV)) {
  ;
  ["log", "warn"].forEach(function (method) {
    var old = console[method];

    console[method] = function () {
      var stack = new Error().stack.split(/\n/);

      if (stack[0].indexOf("Error") === 0) {
        stack = stack.slice(1);
      }

      var args = [].slice.apply(arguments).concat([stack[1].trim()]);
      return old.apply(console, args);
    };
  });
}

var app = (0, _express["default"])();
(0, _middleware["default"])(app);

_mongoose["default"].connection.on("connected", function () {
  app.use("/api", _index["default"]);
});

var sess = {
  store: new MongoStore({
    mongooseConnection: _mongoose["default"].connection
  }),
  secret: _config["default"].sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
};

if (process.env.NODE_ENV === "prod" || process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
  sess.cookie.secure = true;
}

app.use((0, _expressSession["default"])(sess));
var limiter = new _expressRateLimit["default"]({
  store: new _rateLimitRedis["default"]({
    client: _graphqlServer.redis
  }),
  windowMs: 15 * 60 * 1000,
  max: 100,
  delayMs: 0
});
app.use(limiter);

var hbs = _expressHandlebars["default"].create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", _path["default"].resolve(__dirname, "../src/views/layouts"));
var _default = app;
exports["default"] = _default;