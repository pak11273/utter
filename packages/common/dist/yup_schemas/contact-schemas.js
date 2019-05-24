"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contactSchema = void 0;

var yup = _interopRequireWildcard(require("yup"));

var invalidEmail = "email must be a valid email";
var contactSchema = yup.object().shape({
  name: yup.string().max(255),
  subject: yup.string().max(255),
  email: yup.string().max(255).email(invalidEmail),
  message: yup.string().max(3000)
});
exports.contactSchema = contactSchema;