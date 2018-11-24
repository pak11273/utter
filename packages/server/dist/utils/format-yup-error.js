"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatYupError = undefined;

var _yup = require("yup");

var formatYupError = exports.formatYupError = function formatYupError(err) {
  var errors = [];
  err.inner.forEach(function (e) {
    errors.push({
      path: e.path,
      message: e.message
    });
  });
  return errors;
};