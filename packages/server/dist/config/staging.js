"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  logging: true,
  seed: true,
  env: {
    DB_HOST: "mongodb://localhost:27017/staging",
    JWT: process.env.JWT
  }
};