"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuth = exports.signToken = exports.authenticate = exports.verifyUser = exports.getFreshUser = exports.hydrateUser = exports.decodeToken = exports.getUserFromJwt = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _config = _interopRequireDefault(require("../config"));

var _userModel = _interopRequireDefault(require("../api/user/user-model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwtDecode = require("jwt-decode");

var getUserFromJwt = function getUserFromJwt(req, res, next) {
  var authHeader = req.headers.authorization;
  req.user = jwtDecode(authHeader);
  next();
}; // expresss middleware (Deprecating auth in express, moving to graphql)


exports.getUserFromJwt = getUserFromJwt;

var decodeToken = function decodeToken() {
  return function (req, res, next) {
    if (req.headers.authorization) {
      var token = req.headers.authorization;
    }

    if (typeof token !== "undefined" && token !== "null") {
      _jsonwebtoken.default.verify(token, _config.default.env.JWT, function (err, decoded) {
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

exports.decodeToken = decodeToken;

var hydrateUser = function hydrateUser(req, res, next) {
  return function (req, res, next) {
    next();
  };
};

exports.hydrateUser = hydrateUser;

var getFreshUser = function getFreshUser() {
  return function (req, res, next) {
    _userModel.default.findById(req.user._id).then(function (user) {
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

exports.getFreshUser = getFreshUser;

var verifyUser = function verifyUser() {
  return function (req, res, next) {
    var _req$body = req.body,
        identifier = _req$body.identifier,
        password = _req$body.password; // checks input for email or username

    var criteria = identifier.indexOf("@") === -1 ? {
      username: identifier
    } : {
      email: identifier
    };

    if (!identifier || !password) {
      return res.status(400).send("username/email or password cannot be blank");
    } // check if passwords match


    _userModel.default.findOne(criteria).then(function (user) {
      if (!user) {
        res.status(401).json({
          errors: {
            form: "Invalid Credentials"
          }
        });
      } else {
        // use authenticate() on user.doc, pass in the posted password, hash it and check
        if (!user.authenticate(password)) {
          console.log("auth: ", user.authenticate(password));
          console.log("user not authenticated???");
          res.status(401).json({
            errors: {
              form: "Invalid Credentials"
            }
          });
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
}; // another way to authenticate tokens and grab the user


exports.verifyUser = verifyUser;

var authenticate = function authenticate(req, res, next) {
  var authorizationHeader = req.headers["authorization"];
  var token;

  if (authorizationHeader) {
    token = authorizationHeader.split(" ")[1];
  }

  if (token) {
    _jsonwebtoken.default.verify(token, _config.default.env.JWT, function (err, decoded) {
      if (err) {
        res.status(401).json({
          error: "failed to authenticate"
        });
      } else {
        _userModel.default.findOne({
          _id: decoded._id
        }, "_id username email").then(function (user) {
          if (!user) {
            res.status(404).json({
              error: "No such user"
            });
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
}; // util method to sign tokens on signup


exports.authenticate = authenticate;

var signToken = function signToken(id) {
  return _jsonwebtoken.default.sign({
    _id: id
  }, _config.default.env.JWT);
};

exports.signToken = signToken;

var isAuth = function isAuth(req, res, next) {
  var authHeader = req.get("Authorization");

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  var decodedToken;

  try {
    decodedToken = _jsonwebtoken.default.verify(authHeader, _config.default.env.JWT);
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  /* req.userId = decodedToken.userId */

  req.token = decodedToken;
  next();
};

exports.isAuth = isAuth;