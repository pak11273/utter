"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _zoneModel = _interopRequireDefault(require("../api/zone/zone-model"));

var result = _zoneModel.default.find({});

var _default = result;
exports.default = _default;