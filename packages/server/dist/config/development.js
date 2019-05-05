"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  host: "http://localhost:3010",
  logging: true,
  seed: true,
  env: {
    DB_HOST: "mongodb://localhost:27017/development",
    JWT: process.env.JWT
  }
};
exports.default = _default;