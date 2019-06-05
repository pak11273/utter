"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  logging: true,
  seed: true,
  env: {
    DB_HOST: "mongodb://localhost:27017/staging",
    JWT: process.env.JWT
  }
};
exports["default"] = _default;