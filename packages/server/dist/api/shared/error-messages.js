"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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