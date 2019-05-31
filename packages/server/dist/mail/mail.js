"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendForgotPasswordEmail = exports.sendReConfirmEmail = exports.sendConfirmEmail = exports.sendContactEmail = exports.transporter = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _nodemailerExpressHandlebars = _interopRequireDefault(require("nodemailer-express-handlebars"));

var _path = _interopRequireDefault(require("path"));

var _async = _interopRequireDefault(require("async"));

var _userModel = _interopRequireDefault(require("../api/user/user-model.js"));

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
      from: "team@utterzone.com",
      to: "team@utterzone.com",
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

var sendConfirmEmail = function () {
  var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(recipient, link) {
    var data;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = {
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
            return _context.abrupt("return", link);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendConfirmEmail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.sendConfirmEmail = sendConfirmEmail;

var sendReConfirmEmail = function () {
  var _ref2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(recipient, link) {
    var data;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = {
              from: process.env.APP_EMAIL,
              to: recipient,
              template: "reconfirmation-email",
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
            return _context2.abrupt("return", link);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function sendReConfirmEmail(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.sendReConfirmEmail = sendReConfirmEmail;

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