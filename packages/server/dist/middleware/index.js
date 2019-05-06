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
  var whitelist = ["https://utterzone.com", "http://192.168.68.8:8080"];
  var corsOptions = {
    origin: function origin(_origin, callback) {
      if (whitelist.indexOf(_origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  };
  app.options("/graphql", (0, _cors.default)());
  app.use((0, _cors.default)({
    corsOptions: corsOptions
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