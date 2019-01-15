"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var normalizeErrors = exports.normalizeErrors = function normalizeErrors(errors) {
  var errorMap = {};
  errors.forEach(function (err) {
    errorMap[err.path] = err.message;
  });

  return errorMap;
};
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(normalizeErrors, "normalizeErrors", "src/utils/normalize-errors.js");
  leaveModule(module);
})();

;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(normalizeErrors, "normalizeErrors", "src/utils/normalize-errors.js");
  leaveModule(module);
})();

;