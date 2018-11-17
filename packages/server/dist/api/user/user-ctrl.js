"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forgotPasswordEmail = exports.confirmationEmail = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _constants = require("../../constants");

var _redis = require("../../redis.js");

var _userModel = require("./user-model.js");

var _userModel2 = _interopRequireDefault(_userModel);

var _config = require("../../config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var confirmationEmail = exports.confirmationEmail = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var id, key;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            _context.prev = 1;
            _context.next = 4;
            return _redis.redis.get(id);

          case 4:
            key = _context.sent;

            if (key === null) {
              res.status(401).send("Confirmation Error:  You're email confirmation link is invalid or has expired.  Please try signing up again.");
            } else {
              _userModel2.default.findByIdAndUpdate(key, { $set: { confirmed: true } }, function (err, doc) {
                if (err) {
                  res.status(500).send("There was an internal process error.  Please email support about this issue.");
                } else {
                  _redis.redis.del(id);
                  res.status(301).redirect(_config2.default.appURL);
                }
              });
            }
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);

            console.log(_chalk2.default.bgWhite.black.bold("Error: ", _context.t0));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 8]]);
  }));

  return function confirmationEmail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var forgotPasswordEmail = exports.forgotPasswordEmail = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var passwordId, userId;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
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
              // TODO: implement this
              // redirect to reset password form
              // reset password
              /* User.findByIdAndUpdate(userId, {$set: {confirmed: true}}, (err, doc) => { */
              /*   if (err) { */
              /*     res */
              /*       .status(500) */
              /*       .send( */
              /*         `There was an internal process error.  Please email support about this issue.` */
              /*       ) */
              /*   } else { */
              /* redis.del(passwordId) */
              res.status(301).redirect(_config2.default.appURL);
              /* } */
              /* }) */
            }
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);

            console.log(_chalk2.default.bgWhite.black.bold("Error: ", _context2.t0));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 8]]);
  }));

  return function forgotPasswordEmail(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();