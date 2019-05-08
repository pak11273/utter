"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.betaSignupSchema = exports.signupSchema = exports.loginSchema = exports.changePasswordSchema = exports.PasswordValidation = exports.passwordNotLongEnough = exports.emailNotLongEnough = exports.invalidEmail = void 0;

var yup = _interopRequireWildcard(require("yup"));

var invalidLogin = "invalid login";
var invalidEmail = "email must be a valid email";
exports.invalidEmail = invalidEmail;
var emailNotLongEnough = "email must be at least 3 characters";
exports.emailNotLongEnough = emailNotLongEnough;
var passwordNotLongEnough = "password must be at least 8 characters";
exports.passwordNotLongEnough = passwordNotLongEnough;
var PasswordValidation = yup.string().min(8, passwordNotLongEnough).max(255).matches(/[a-z]/, "One lowercase character is required.").matches(/[A-Z]/, "One uppercase character is required.").matches(/[a-zA-Z]+[^a-zA-Z\s]+/, "A number or special char (@,!,#, etc) is required.").required("Password is required");
exports.PasswordValidation = PasswordValidation;
var changePasswordSchema = yup.object().shape({
  password: PasswordValidation,
  "password confirmation": yup.string().oneOf([yup.ref("password"), null], "Passwords do not match").required("Password confirmation is required")
});
exports.changePasswordSchema = changePasswordSchema;
var loginSchema = yup.object().shape({
  "username or email": yup.string().min(3, invalidLogin).max(255, invalidLogin).required("Username or Email is required"),
  password: PasswordValidation
});
exports.loginSchema = loginSchema;
var signupSchema = yup.object().shape({
  username: yup.string().min(3).max(255).required("Username is required"),
  email: yup.string().min(3, emailNotLongEnough).max(255).email(invalidEmail).required("Email is required"),
  password: PasswordValidation,
  "password confirmation": yup.string().oneOf([yup.ref("password"), null], "Passwords do not match").required("Password confirmation is required")
});
exports.signupSchema = signupSchema;
var betaSignupSchema = yup.object().shape({
  email: yup.string().min(3, emailNotLongEnough).max(255).email(invalidEmail).required("Email is required"),
  firstName: yup.string().min(1).max(255).required("A first name is required"),
  lastName: yup.string().min(1).max(255).required("A last name is required")
});
exports.betaSignupSchema = betaSignupSchema;