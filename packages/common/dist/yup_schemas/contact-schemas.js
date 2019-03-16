"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contactSchema = undefined;

var _yup = require("yup");

var yup = _interopRequireWildcard(_yup);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var invalidEmail = "email must be a valid email";

var contactSchema = exports.contactSchema = yup.object().shape({
  name: yup.string().max(255),
  subject: yup.string().max(255),
  email: yup.string().max(255).email(invalidEmail),
  message: yup.string().max(3000)
});