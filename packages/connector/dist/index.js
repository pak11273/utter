'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _signupConnector = require('./connectors/signupConnector.js');

Object.keys(_signupConnector).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _signupConnector[key];
    }
  });
});