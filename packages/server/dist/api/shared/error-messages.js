"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userNotFound = exports.passwordLocked = exports.invalidLogin = exports.invalidEmail = exports.expiredKeyError = exports.duplicateUsername = exports.duplicateEmail = exports.confirmEmailError = void 0;
var invalidEmail = "email must be a valid email";
exports.invalidEmail = invalidEmail;
var invalidLogin = "invalid username or email";
exports.invalidLogin = invalidLogin;
var duplicateEmail = "email is already taken";
exports.duplicateEmail = duplicateEmail;
var duplicateUsername = "username is already taken";
exports.duplicateUsername = duplicateUsername;
var userNotFound = "could not find user with that email";
exports.userNotFound = userNotFound;
var expiredKeyError = "Your key has expired.  Please re-submit your email address.";
exports.expiredKeyError = expiredKeyError;
var confirmEmailError = "You have not confirmed your email, Please check you email for instructions.";
exports.confirmEmailError = confirmEmailError;
var passwordLocked = "Account is locked.";
exports.passwordLocked = passwordLocked;