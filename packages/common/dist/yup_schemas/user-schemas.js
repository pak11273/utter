"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renewConfirmationSchema = exports.betaSignupSchema = exports.signupSchema = exports.loginSchema = exports.changePasswordSchema = exports.PasswordValidation = exports.betaAccessSchema = exports.maxChars = exports.minChars = exports.passwordNotLongEnough = exports.emailNotLongEnough = exports.invalidEmail = void 0;

var yup = _interopRequireWildcard(require("yup"));

var invalidLogin = "invalid login";
var invalidEmail = "email must be a valid email";
exports.invalidEmail = invalidEmail;
var emailNotLongEnough = "email must be at least 3 characters";
exports.emailNotLongEnough = emailNotLongEnough;
var passwordNotLongEnough = "password must be at least 8 characters";
exports.passwordNotLongEnough = passwordNotLongEnough;
var minChars = "Must be a minimum of 3 characters";
exports.minChars = minChars;
var maxChars = "Cannot exceed 255 characters";
exports.maxChars = maxChars;
var betaAccessSchema = yup.object().shape({
  key: yup.string().required("A beta key is required")
});
exports.betaAccessSchema = betaAccessSchema;
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
  firstName: yup.string().min(1, "minimum of one character").max(255, maxChars).required("A first name is required"),
  lastName: yup.string().min(1, "minimum of one character").max(255, maxChars).required("A last name is required"),
  linkedIn: yup.string().max(255, maxChars),
  whyLearning: yup.string().max(1400, "maximum of 1400 characters"),
  nativeLang: yup.string().max(255, maxChars),
  currentlyLearning: yup.string().max(255, maxChars),
  howLongLearning: yup.string().max(255, maxChars),
  dayLearningHrs: yup.string().max(255, maxChars)
});
exports.betaSignupSchema = betaSignupSchema;
var renewConfirmationSchema = yup.object().shape({
  email: yup.string().min(3, emailNotLongEnough).max(255).email(invalidEmail).required("Email is required")
});
exports.renewConfirmationSchema = renewConfirmationSchema;