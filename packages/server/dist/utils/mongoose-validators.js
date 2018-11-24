"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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