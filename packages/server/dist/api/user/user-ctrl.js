"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forgotPasswordEmail = exports.confirmationEmail = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _constants = require("../../constants");

var _redis = require("../../redis.js");

var _userModel = _interopRequireDefault(require("./user-model.js"));

var _config = _interopRequireDefault(require("../../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var confirmationEmail =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var id, key;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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
              _userModel.default.findByIdAndUpdate(key, {
                $set: {
                  confirmed: true
                }
              }, function (err, doc) {
                if (err) {
                  res.status(500).send("There was an internal process error.  Please email support about this issue.");
                } else {
                  _redis.redis.del(id);

                  res.status(301).redirect(_config.default.appURL);
                }
              });
            }

            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            console.log(_chalk.default.bgWhite.black.bold("Error: ", _context.t0));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));

  return function confirmationEmail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.confirmationEmail = confirmationEmail;

var forgotPasswordEmail =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var passwordId, userId;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
              res.status(301).redirect(_config.default.appURL);
              /* } */

              /* }) */
            }

            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            console.log(_chalk.default.bgWhite.black.bold("Error: ", _context2.t0));

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