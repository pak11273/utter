"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendForgotPasswordEmail = exports.sendConfirmEmail = exports.sendContactEmail = exports.transporter = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _nodemailerExpressHandlebars = _interopRequireDefault(require("nodemailer-express-handlebars"));

var _path = _interopRequireDefault(require("path"));

var _async = _interopRequireDefault(require("async"));

var _userModel = _interopRequireDefault(require("../api/user/user-model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
  viewEngine: "handlebars",
  viewPath: _path.default.join(__dirname, "../../src/views/layouts"),
  extName: ".handlebars"
};

var transporter = _nodemailer.default.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD
  }
});

exports.transporter = transporter;
transporter.use("compile", (0, _nodemailerExpressHandlebars.default)(options));

var sendContactEmail = function sendContactEmail(args) {
  return new Promise(function (resolve, reject) {
    var data = {
      from: "utterzone11273@gmail.com",
      to: "pak11273@gmail.com",
      template: "contact-email",
      subject: args.input.subject,
      context: {
        name: args.input.name,
        phone: args.input.phone,
        email: args.input.email,
        subject: args.input.subject,
        message: args.input.message
      }
    };
    return transporter.sendMail(data, function (error, info) {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

exports.sendContactEmail = sendContactEmail;

var sendConfirmEmail = function sendConfirmEmail(recipient, link) {
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

exports.sendConfirmEmail = sendConfirmEmail;

var sendForgotPasswordEmail = function sendForgotPasswordEmail(recipient, link) {
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

exports.sendForgotPasswordEmail = sendForgotPasswordEmail;