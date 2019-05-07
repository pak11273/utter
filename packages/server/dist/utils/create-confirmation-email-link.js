"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEmailConfirmLink = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _uuid = require("uuid");

var _constants = require("../constants");

var createEmailConfirmLink = function () {
  var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(url, userId, redis) {
    var id;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = (0, _uuid.v4)();
            _context.next = 3;
            return redis.set("".concat(_constants.confirmEmailPrefix).concat(id), userId, "ex", 60 * 60 * 24);

          case 3:
            console.log("link: ", "".concat(url, "/confirm-email/").concat(id));
            return _context.abrupt("return", "".concat(url, "/confirm-email/").concat(id));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createEmailConfirmLink(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.createEmailConfirmLink = createEmailConfirmLink;