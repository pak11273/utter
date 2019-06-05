"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatYupError = void 0;

var _yup = require("yup");

var formatYupError = function formatYupError(err) {
  var errors = [];
  err.inner.forEach(function (e) {
    errors.push({
      path: e.path,
      message: e.message
    });
  });
  return errors;
};

exports.formatYupError = formatYupError;