"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.history = void 0;

var _createBrowserHistory = _interopRequireDefault(require("history/createBrowserHistory"));

var history = (0, _createBrowserHistory["default"])();
exports.history = history;