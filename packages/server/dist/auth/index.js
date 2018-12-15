"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signToken = exports.authenticate = exports.verifyUser = exports.getFreshUser = exports.hydrateUser = exports.decodeToken = exports.getUserFromJwt = undefined;

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _expressJwt = require("express-jwt");

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

var _userModel = require("../api/user/user-model.js");

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwtDecode = require("jwt-decode");
var getUserFromJwt = exports.getUserFromJwt = function getUserFromJwt(req, res, next) {
  var authHeader = req.headers.authorization;
  console.log("ahuthHeader: ", authHeader);
  req.user = jwtDecode(authHeader);
  next();
};

// expresss middleware (Deprecating auth in express, moving to graphql)
var decodeToken = exports.decodeToken = function decodeToken() {
  return function (req, res, next) {
    if (req.headers.authorization) {
      var token = req.headers.authorization;
    }

    if (typeof token !== "undefined" && token !== "null") {
      _jsonwebtoken2.default.verify(token, _config2.default.env.JWT, function (err, decoded) {
        if (err) {
          res.status(401).json({
            error: "failed to authenticate"
          });
        } else {
          req.user = {};
          req.user.id = decoded._id;
        }
      });
    }
    next();
  };
};

var hydrateUser = exports.hydrateUser = function hydrateUser(req, res, next) {
  return function (req, res, next) {
    next();
  };
};

var getFreshUser = exports.getFreshUser = function getFreshUser() {
  return function (req, res, next) {
    _userModel2.default.findById(req.user._id).then(function (user) {
      if (!user) {
        /* if no user was found it was a valid jwt token but no user was found with the id provided.  Either the user was deleted or the jwt was from another source.
         */
        res.status(401).send("UnAuthorized");
      } else {
        console.log("req: ", req.user);
        req.user = user;
        next();
      }
    }, function (err) {
      next(err);
    });
  };
};

var verifyUser = exports.verifyUser = function verifyUser() {
  return function (req, res, next) {
    var _req$body = req.body,
        identifier = _req$body.identifier,
        password = _req$body.password;
    // checks input for email or username

    var criteria = identifier.indexOf("@") === -1 ? { username: identifier } : { email: identifier };
    if (!identifier || !password) {
      return res.status(400).send("username/email or password cannot be blank");
    }
    // check if passwords match
    _userModel2.default.findOne(criteria).then(function (user) {
      if (!user) {
        res.status(401).json({ errors: { form: "Invalid Credentials" } });
      } else {
        // use authenticate() on user.doc, pass in the posted password, hash it and check
        if (!user.authenticate(password)) {
          console.log("auth: ", user.authenticate(password));
          console.log("user not authenticated???");
          res.status(401).json({ errors: { form: "Invalid Credentials" } });
        } else {
          // if everything is good then attach to req.user
          // and call next() so the controller can sign a token form the req.user_id
          req.user = user;
          next();
        }
      }
    }, function (err) {
      next(err);
    });
  };
};

// another way to authenticate tokens and grab the user
var authenticate = exports.authenticate = function authenticate(req, res, next) {
  var authorizationHeader = req.headers["authorization"];
  var token = void 0;
  if (authorizationHeader) {
    token = authorizationHeader.split(" ")[1];
  }
  if (token) {
    _jsonwebtoken2.default.verify(token, _config2.default.env.JWT, function (err, decoded) {
      if (err) {
        res.status(401).json({
          error: "failed to authenticate"
        });
      } else {
        _userModel2.default.findOne({ _id: decoded._id }, "_id username email").then(function (user) {
          if (!user) {
            res.status(404).json({ error: "No such user" });
          }
          req.currentUser = user;
          next();
        }, function (err) {
          next(err);
        });
      }
    });
  } else {
    res.status(403).json({
      error: "No token provided"
    });
  }
};

// util method to sign tokens on signup
var signToken = exports.signToken = function signToken(id) {
  return _jsonwebtoken2.default.sign({ _id: id }, _config2.default.env.JWT, { expiresIn: _config2.default.expireTime });
};