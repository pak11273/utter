"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendForgotPasswordEmail = exports.sendConfirmEmail = exports.transporter = undefined;

var _nodemailer = require("nodemailer");

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _nodemailerExpressHandlebars = require("nodemailer-express-handlebars");

var _nodemailerExpressHandlebars2 = _interopRequireDefault(_nodemailerExpressHandlebars);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _userModel = require("../api/user/user-model.js");

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
  viewEngine: "handlebars",
  viewPath: _path2.default.join(__dirname, "../../src/views/layouts"),
  extName: ".handlebars"
};

var transporter = exports.transporter = _nodemailer2.default.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD
  }
});

transporter.use("compile", (0, _nodemailerExpressHandlebars2.default)(options));

var sendConfirmEmail = exports.sendConfirmEmail = function sendConfirmEmail(recipient, link) {
  var data = {
    from: process.env.APP_EMAIL,
    to: recipient,
    template: "confirmation-email",
    subject: "Please confirm your email account",
    context: {
      confirmEmailUrl: link
    }
  };
  transporter.sendMail(data, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

var sendForgotPasswordEmail = exports.sendForgotPasswordEmail = function sendForgotPasswordEmail(recipient, link) {
  var data = {
    from: process.env.APP_EMAIL,
    to: recipient,
    template: "forgot-password-email",
    subject: "Your password reset request",
    context: {
      passwordUrl: link
    }
  };
  transporter.sendMail(data, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};