"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("dotenv").config();

exports.default = function (app) {
  app.use((0, _cors2.default)({
    credentials: true,
    origin: false
    //        process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod"
    //          ? [
    //              process.env.REACT_APP_CLIENT_URL,
    //              /\.utterzone\.com$/,
    //              "http://www.utterzone.com",
    //              "https://www.utterzone.com",
    //              "https://utterzone.com",
    //              "http://utterzone.com",
    //              "utterzone.com"
    //            ]
    //          : "http://localhost:8080"
  }));
  app.options("/graphql", (0, _cors2.default)());
  app.use((0, _morgan2.default)("dev"));
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_bodyParser2.default.json());
  _mongoose2.default.Promise = _bluebird2.default;
  app.use(_passport2.default.initialize());
  app.use(_passport2.default.session());
  _mongoose2.default.connect(_config2.default.env.DB_HOST, {
    useCreateIndex: true,
    useNewUrlParser: true
  });
};