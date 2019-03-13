"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signupSchema = exports.loginSchema = exports.changePasswordSchema = exports.PasswordValidation = exports.passwordNotLongEnough = exports.emailNotLongEnough = exports.invalidEmail = undefined;

var _yup = require("yup");

var yup = _interopRequireWildcard(_yup);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var invalidLogin = "invalid login";

var invalidEmail = exports.invalidEmail = "email must be a valid email";
var emailNotLongEnough = exports.emailNotLongEnough = "email must be at least 3 characters";
var passwordNotLongEnough = exports.passwordNotLongEnough = "password must be at least 8 characters";

var PasswordValidation = exports.PasswordValidation = yup.string().min(8, passwordNotLongEnough).max(255).matches(/[a-z]/, "One lowercase character is required.").matches(/[A-Z]/, "One uppercase character is required.").matches(/[a-zA-Z]+[^a-zA-Z\s]+/, "A number or special char (@,!,#, etc) is required.").required("Password is required");

var changePasswordSchema = exports.changePasswordSchema = yup.object().shape({
  password: PasswordValidation,
  "password confirmation": yup.string().oneOf([yup.ref("password"), null], "Passwords do not match").required("Password confirmation is required")
});

var loginSchema = exports.loginSchema = yup.object().shape({
  "username or email": yup.string().min(3, invalidLogin).max(255, invalidLogin).required("Username or Email is required"),
  password: PasswordValidation
});

var signupSchema = exports.signupSchema = yup.object().shape({
  username: yup.string().min(3).max(255).required("Username is required"),
  email: yup.string().min(3, emailNotLongEnough).max(255).email(invalidEmail).required("Email is required"),
  password: PasswordValidation,
  "password confirmation": yup.string().oneOf([yup.ref("password"), null], "Passwords do not match").required("Password confirmation is required")
});