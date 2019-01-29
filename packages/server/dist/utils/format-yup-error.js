"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatYupError = undefined;

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

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
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(formatYupError, "formatYupError", "src/utils/format-yup-error.js");
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

  reactHotLoader.register(formatYupError, "formatYupError", "src/utils/format-yup-error.js");
  leaveModule(module);
})();

;