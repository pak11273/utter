"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redis = void 0;

var _ioredis = _interopRequireDefault(require("ioredis"));

var redis = new _ioredis["default"](process.env.REDIS_URL);
exports.redis = redis;