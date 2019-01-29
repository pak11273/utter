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

var mongoose = require("mongoose");
var validate = require("mongoose-validator");

var passwordValidator = exports.passwordValidator = [validate({
  validator: "isLength",
  arguments: [8],
  message: "Password should be more than {ARGS[0]} characters"
}), validate({
  validator: "isAlphanumeric",
  passIfEmpty: true,
  message: "Password should contain alpha-numeric characters only"
})];
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(passwordValidator, "passwordValidator", "src/utils/mongoose-validators.js");
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

  reactHotLoader.register(passwordValidator, "passwordValidator", "src/utils/mongoose-validators.js");
  leaveModule(module);
})();

;