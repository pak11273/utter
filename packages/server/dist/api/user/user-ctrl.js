"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forgotPasswordEmail = exports.confirmationEmail = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chalk = _interopRequireDefault(require("chalk"));

var _constants = require("../../constants");

var _redis = require("../../redis.js");

var _userModel = _interopRequireDefault(require("./user-model.js"));

var _config = _interopRequireDefault(require("../../config"));

var confirmationEmail = function () {
  var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(req, res) {
    var id, redisKey, userId;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            console.log("id: ", id);
            redisKey = _constants.confirmEmailPrefix + id;
            _context.prev = 3;
            _context.next = 6;
            return _redis.redis.get(redisKey);

          case 6:
            userId = _context.sent;
            console.log("key: ", userId);

            if (userId === null) {
              res.send("You're email confirmation link is invalid or has expired.  Please try signing up again.");
            } else {
              _userModel["default"].findByIdAndUpdate(userId, {
                $set: {
                  confirmed: true
                }
              }, function (err, doc) {
                if (err) {
                  res.status(500).send("There was an internal process error.  Please email support about this issue.");
                } else {
                  _redis.redis.del(redisKey);

                  res.send("Your email has been validated.  You can now log in.");
                }
              });
            }

            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](3);
            console.log(_chalk["default"].bgWhite.black.bold("Error: ", _context.t0));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 11]]);
  }));

  return function confirmationEmail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.confirmationEmail = confirmationEmail;

var forgotPasswordEmail = function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2(req, res) {
    var passwordId, userId;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            passwordId = _constants.forgotPasswordPrefix + req.params.id;
            _context2.prev = 1;
            _context2.next = 4;
            return _redis.redis.get(passwordId);

          case 4:
            userId = _context2.sent;

            if (userId === null) {
              res.status(401).send("Confirmation Error:  You're email confirmation link is invalid or has expired.  Please try again.");
            } else {
              res.status(301).redirect(_config["default"].appURL);
            }

            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            console.log(_chalk["default"].bgWhite.black.bold("Error: ", _context2.t0));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));

  return function forgotPasswordEmail(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.forgotPasswordEmail = forgotPasswordEmail;