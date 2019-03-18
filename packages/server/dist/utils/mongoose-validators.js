"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordValidator = void 0;

var mongoose = require("mongoose");

var validate = require("mongoose-validator");

var passwordValidator = [validate({
  validator: "isLength",
  arguments: [8],
  message: "Password should be more than {ARGS[0]} characters"
}), validate({
  validator: "isAlphanumeric",
  passIfEmpty: true,
  message: "Password should contain alpha-numeric characters only"
})];
exports.passwordValidator = passwordValidator;