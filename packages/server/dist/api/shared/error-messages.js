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

var invalidEmail = "email must be a valid email";
var invalidLogin = "invalid username or email";
var duplicateEmail = "email is already taken";
var duplicateUsername = "username is already taken";
var userNotFound = "could not find user with that email";
var expiredKey = "key has expired";
var confirmEmail = "You have not confirmed your email, Please check you email for instructions.";
var passwordLocked = "Account is locked.";

exports.confirmEmail = confirmEmail;
exports.duplicateEmail = duplicateEmail;
exports.duplicateUsername = duplicateUsername;
exports.invalidEmail = invalidEmail;
exports.invalidLogin = invalidLogin;
exports.passwordLocked = passwordLocked;
exports.userNotFound = userNotFound;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(invalidEmail, "invalidEmail", "src/api/shared/error-messages.js");
  reactHotLoader.register(invalidLogin, "invalidLogin", "src/api/shared/error-messages.js");
  reactHotLoader.register(duplicateEmail, "duplicateEmail", "src/api/shared/error-messages.js");
  reactHotLoader.register(duplicateUsername, "duplicateUsername", "src/api/shared/error-messages.js");
  reactHotLoader.register(userNotFound, "userNotFound", "src/api/shared/error-messages.js");
  reactHotLoader.register(expiredKey, "expiredKey", "src/api/shared/error-messages.js");
  reactHotLoader.register(confirmEmail, "confirmEmail", "src/api/shared/error-messages.js");
  reactHotLoader.register(passwordLocked, "passwordLocked", "src/api/shared/error-messages.js");
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

  reactHotLoader.register(invalidEmail, "invalidEmail", "src/api/shared/error-messages.js");
  reactHotLoader.register(invalidLogin, "invalidLogin", "src/api/shared/error-messages.js");
  reactHotLoader.register(duplicateEmail, "duplicateEmail", "src/api/shared/error-messages.js");
  reactHotLoader.register(duplicateUsername, "duplicateUsername", "src/api/shared/error-messages.js");
  reactHotLoader.register(userNotFound, "userNotFound", "src/api/shared/error-messages.js");
  reactHotLoader.register(expiredKey, "expiredKey", "src/api/shared/error-messages.js");
  reactHotLoader.register(confirmEmail, "confirmEmail", "src/api/shared/error-messages.js");
  reactHotLoader.register(passwordLocked, "passwordLocked", "src/api/shared/error-messages.js");
  leaveModule(module);
})();

;