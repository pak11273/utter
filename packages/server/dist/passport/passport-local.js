"use strict";

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

var _passportLocal = require("passport-local");

var _passportLocal2 = _interopRequireDefault(_passportLocal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocalStrategy = _passportLocal2.default.Strategy;

_passport2.default.serializeUser(function (user, done) {
  done(null, user.id);
});

_passport2.default.deserializeUser(function (id, done) {
  _user2.default.findById(id, function (err, user) {
    done(err, user);
  });
});

// Not using passport local strategy, this is just for example
_passport2.default.use("local.signup", new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, function (req, email, password, done) {
  _user2.default.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }

    if (user) {
      return done(null, false
      /* req.flash("error", "User with email already exist") */
      );
    }

    var newUser = new _user2.default();
    newUser.username = req.body.username;
    newUser.fullname = req.body.username;
    newUser.email = req.body.email;
    newUser.password = newUser.encryptPassword(req.body.password);

    newUser.save(function (err) {
      done(null, newUser);
    });
  });
}));

_passport2.default.use("local.login", new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, function (req, email, password, done) {
  _user2.default.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }

    var messages = [];
    if (!user || !user.validUserPassword(password)) {
      messages.push("Email Does Not Exist or Password is Invalid");
      /* return done(null, false, req.flash("error", messages)) */
    }

    return done(null, user);
  });
}));