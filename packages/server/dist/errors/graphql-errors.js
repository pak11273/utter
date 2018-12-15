"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forbiddenError = exports.alreadyAuthentictedError = exports.authorizationError = exports.unkownError = undefined;

var _apolloErrors = require("apollo-errors");

var unkownError = exports.unkownError = (0, _apolloErrors.createError)("unkownError", {
  message: "An unkown error has occurred."
});

var authorizationError = exports.authorizationError = (0, _apolloErrors.createError)("authorizationError", {
  message: "You are not authorized."
});

var alreadyAuthentictedError = exports.alreadyAuthentictedError = (0, _apolloErrors.createError)("alreadyAuthentictedError", {
  message: "You are already authenticated."
});

var forbiddenError = exports.forbiddenError = (0, _apolloErrors.createError)("forbiddenError", {
  message: "You are not allowed to do that."
});