"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cors = _interopRequireDefault(require("cors"));

var _bluebird = _interopRequireDefault(require("bluebird"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _passport = _interopRequireDefault(require("passport"));

var _config = _interopRequireDefault(require("../config"));

require("dotenv").config();

var _default = function _default(app) {
  app.use((0, _cors.default)({
    credentials: true,
    origin: process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod" ? ["https://utterzone.com", /\.utterzone\.com$/, "https://utterzone.com:80", "https://utterzone:443"] : ["http://localhost:8080", "http://192.168.68.8:8080"]
  }));
  app.use((0, _morgan.default)("dev"));
  app.use(_bodyParser.default.urlencoded({
    extended: true
  }));
  app.use(_bodyParser.default.json());
  _mongoose.default.Promise = Promise;
  app.use(_passport.default.initialize());
  app.use(_passport.default.session());

  _mongoose.default.connect(_config.default.env.DB_HOST, {
    useCreateIndex: true,
    useNewUrlParser: true
  }).then().catch(function (err) {
    console.log("mongoose error: ", err);
  });
};

exports.default = _default;