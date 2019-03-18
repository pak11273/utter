"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userNotFound = exports.passwordLocked = exports.invalidLogin = exports.invalidEmail = exports.duplicateUsername = exports.duplicateEmail = exports.confirmEmail = void 0;
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
var expiredKey = "key has expired";
var confirmEmail = "You have not confirmed your email, Please check you email for instructions.";
exports.confirmEmail = confirmEmail;
var passwordLocked = "Account is locked.";
exports.passwordLocked = passwordLocked;