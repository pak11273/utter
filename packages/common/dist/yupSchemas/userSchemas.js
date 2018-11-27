"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signupSchema = exports.loginSchema = exports.PasswordValidation = exports.passwordNotLongEnough = exports.emailNotLongEnough = exports.invalidEmail = undefined;

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _yup = require("yup");

var yup = _interopRequireWildcard(_yup);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var invalidEmail = exports.invalidEmail = "email must be a valid email";
var emailNotLongEnough = exports.emailNotLongEnough = "email must be at least 3 characters";
var passwordNotLongEnough = exports.passwordNotLongEnough = "password must be at least 8 characters";

var PasswordValidation = exports.PasswordValidation = yup.string().min(8, passwordNotLongEnough).max(255).required("Password is required");

var invalidLogin = "invalid login";

var loginSchema = exports.loginSchema = yup.object().shape({
  "username or email": yup.string().min(3, invalidLogin).max(255, invalidLogin).required("Username or Email is required"),
  password: PasswordValidation,
  "password confirmation": yup.string().oneOf([yup.ref("password"), null], "Passwords do not match").required("Password confirmation is required")
});

var signupSchema = exports.signupSchema = yup.object().shape({
  username: yup.string().min(3).max(255).required("Username is required"),
  email: yup.string().min(3, emailNotLongEnough).max(255).email(invalidEmail).required("Email is required"),
  password: PasswordValidation,
  "password confirmation": yup.string().oneOf([yup.ref("password"), null], "Passwords do not match").required("Password confirmation is required")
});
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(invalidEmail, "invalidEmail", "src/yupSchemas/userSchemas.js");
  reactHotLoader.register(emailNotLongEnough, "emailNotLongEnough", "src/yupSchemas/userSchemas.js");
  reactHotLoader.register(passwordNotLongEnough, "passwordNotLongEnough", "src/yupSchemas/userSchemas.js");
  reactHotLoader.register(PasswordValidation, "PasswordValidation", "src/yupSchemas/userSchemas.js");
  reactHotLoader.register(loginSchema, "loginSchema", "src/yupSchemas/userSchemas.js");
  reactHotLoader.register(signupSchema, "signupSchema", "src/yupSchemas/userSchemas.js");
  reactHotLoader.register(invalidLogin, "invalidLogin", "src/yupSchemas/userSchemas.js");
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

  reactHotLoader.register(invalidEmail, "invalidEmail", "src/yupSchemas/userSchemas.js");
  reactHotLoader.register(emailNotLongEnough, "emailNotLongEnough", "src/yupSchemas/userSchemas.js");
  reactHotLoader.register(passwordNotLongEnough, "passwordNotLongEnough", "src/yupSchemas/userSchemas.js");
  reactHotLoader.register(PasswordValidation, "PasswordValidation", "src/yupSchemas/userSchemas.js");
  reactHotLoader.register(loginSchema, "loginSchema", "src/yupSchemas/userSchemas.js");
  reactHotLoader.register(signupSchema, "signupSchema", "src/yupSchemas/userSchemas.js");
  reactHotLoader.register(invalidLogin, "invalidLogin", "src/yupSchemas/userSchemas.js");
  leaveModule(module);
})();

;