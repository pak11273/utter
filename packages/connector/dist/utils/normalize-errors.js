"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeErrors = void 0;

var normalizeErrors = function normalizeErrors(errors) {
  var errorMap = {};
  errors.forEach(function (err) {
    errorMap[err.path] = err.message;
  });
  return errorMap;
};

exports.normalizeErrors = normalizeErrors;