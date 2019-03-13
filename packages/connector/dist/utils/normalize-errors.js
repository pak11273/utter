"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var normalizeErrors = exports.normalizeErrors = function normalizeErrors(errors) {
  var errorMap = {};
  errors.forEach(function (err) {
    errorMap[err.path] = err.message;
  });

  return errorMap;
};