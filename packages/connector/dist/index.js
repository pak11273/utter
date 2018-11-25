"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _signupConnector = require("./connectors/signup-connector.js");

Object.keys(_signupConnector).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _signupConnector[key];
    }
  });
});

var _loginConnector = require("./connectors/login-connector.js");

Object.keys(_loginConnector).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _loginConnector[key];
    }
  });
});