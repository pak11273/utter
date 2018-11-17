"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forgotPasswordLockAccount = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var forgotPasswordLockAccount = exports.forgotPasswordLockAccount = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(userId, redis) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // deny login
            User.findByIdAndUpdate(userId, { $set: { forgotPasswordLocked: true } }, function (err, doc) {});

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function forgotPasswordLockAccount(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();