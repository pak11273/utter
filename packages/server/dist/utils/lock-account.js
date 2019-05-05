"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forgotPasswordLockAccount = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var forgotPasswordLockAccount = function () {
  var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(userId, redis) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            User.findByIdAndUpdate(userId, {
              $set: {
                forgotPasswordLocked: true
              }
            }, function (err, doc) {});

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function forgotPasswordLockAccount(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.forgotPasswordLockAccount = forgotPasswordLockAccount;