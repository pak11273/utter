"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redis = undefined;

var _ioredis = require("ioredis");

var _ioredis2 = _interopRequireDefault(_ioredis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var redis = exports.redis = new _ioredis2.default(process.env.REDIS_URL);