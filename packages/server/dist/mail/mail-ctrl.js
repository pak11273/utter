"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userModel = require("../api/user/user-model");

var _userModel2 = _interopRequireDefault(_userModel);

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

var _mailRoutes = require("../mail/mail-routes.js");

var _mailRoutes2 = _interopRequireDefault(_mailRoutes);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _mail = require("./mail.js");

var _nodemailerExpressHandlebars = require("nodemailer-express-handlebars");

var _nodemailerExpressHandlebars2 = _interopRequireDefault(_nodemailerExpressHandlebars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
  viewEngine: "handlebars",
  viewPath: _path2.default.resolve("../utter/server/src/templates/email"),
  extName: ".html"
};

// add nodemailer-express-handlebars to transporter


_mail.transporter.use("compile", (0, _nodemailerExpressHandlebars2.default)(options));

exports.default = {
  contactmail: function contactmail(req, res) {
    var data = {
      from: "utterzone11273@gmail.com",
      to: "pak11273@gmail.com",
      template: "contact-email",
      subject: req.body.subject,
      context: {
        name: req.body.name,
        phone: req.body.country + " " + req.body.number,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.letter
      }
    };
    _mail.transporter.sendMail(data, function (error, info) {
      if (error) {
        res.json(error);
        console.log(error);
      } else {
        res.json({
          message: "Your message was successfully sent."
        });
        console.log("Email sent: " + info.response);
      }
    });
  },

  forgotPassword: function forgotPassword(req, res) {
    _async2.default.waterfall([function (done) {
      _userModel2.default.findOne({
        email: req.body.email
      }).exec(function (err, user) {
        if (user) {
          done(err, user);
        } else {
          done("We're sorry. There was no user found with that email address.");
        }
      });
    }, function (user, done) {
      // create the random token
      _crypto2.default.randomBytes(20, function (err, buffer) {
        var token = buffer.toString("hex");
        done(err, user, token);
      });
    }, function (user, token, done) {
      _userModel2.default.findByIdAndUpdate({ _id: user._id }, {
        reset_password_token: token,
        reset_password_expires: Date.now() + 86400000
      }, { upsert: true, new: true }).exec(function (err, new_user) {
        done(err, token, new_user);
      });
    }, function (token, user, done) {
      var data = {
        to: user.email,
        from: "utter@utter.zone",
        template: "forgot-password-email",
        subject: "Password help has arrived!",
        context: {
          // TODO: change this url in production
          url: "http://localhost:8080/reset-password?user=" + user.username + "&token=" + token,
          name: user.username
        }
        // done(null, token, user)

      };_mail.transporter.sendMail(data, function (err) {
        if (!err) {
          done(err, token, user);
        } else {
          return done(null, token, user);
        }
      });
    }], function (err, token, new_user) {
      if (err) {
        return res.status(422).json({ message: err });
      } else {
        res.status(200).json({ message: "Kindly check your email for further instructions" });
      }
    });
  },

  resetPassword: function resetPassword(req, res, next) {
    _userModel2.default.findOne({
      reset_password_token: req.body.token,
      reset_password_expires: {
        $gt: Date.now()
      }
    }).exec(function (err, user) {
      if (!err && user) {
        if (req.body.password === req.body.passwordConfirmation) {
          user.password = user.encryptPassword(req.body.password);
          user.reset_password_token = undefined;
          user.reset_password_expires = undefined;
          user.save(function (err) {
            if (err) {
              return res.status(422).send({
                message: err
              });
            } else {
              var data = {
                to: user.email,
                from: "utterzone11273@gmail.com",
                template: "reset-password-email",
                subject: "Password Reset Confirmation",
                context: {
                  name: user.username
                }
              };

              _mail.transporter.sendMail(data, function (err) {
                if (!err) {
                  return res.json({ message: "Password reset" });
                } else {
                  return done(err);
                }
              });
            }
          });
        } else {
          return res.status(422).send({
            message: "Passwords do not match"
          });
        }
      } else {
        return res.status(400).send({
          message: "Password reset token is invalid or has expired."
        });
      }
    });
  }
};