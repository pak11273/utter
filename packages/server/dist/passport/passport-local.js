"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _user = _interopRequireDefault(require("../models/user"));

var _passportLocal = _interopRequireDefault(require("passport-local"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocalStrategy = _passportLocal.default.Strategy;

_passport.default.serializeUser(function (user, done) {
  done(null, user.id);
});

_passport.default.deserializeUser(function (id, done) {
  _user.default.findById(id, function (err, user) {
    done(err, user);
  });
}); // Not using passport local strategy, this is just for example


_passport.default.use("local.signup", new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, function (req, email, password, done) {
  _user.default.findOne({
    email: email
  }, function (err, user) {
    if (err) {
      return done(err);
    }

    if (user) {
      return done(null, false
      /* req.flash("error", "User with email already exist") */
      );
    }

    var newUser = new _user.default();
    newUser.username = req.body.username;
    newUser.fullname = req.body.username;
    newUser.email = req.body.email;
    newUser.password = newUser.encryptPassword(req.body.password);
    newUser.save(function (err) {
      done(null, newUser);
    });
  });
}));

_passport.default.use("local.login", new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, function (req, email, password, done) {
  _user.default.findOne({
    email: email
  }, function (err, user) {
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