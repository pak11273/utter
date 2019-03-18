"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEmailConfirmLink = void 0;

var _uuid = require("uuid");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createEmailConfirmLink =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(url, userId, redis) {
    var id;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = (0, _uuid.v4)();
            _context.next = 3;
            return redis.set(id, userId, "ex", 60 * 60 * 24);

          case 3:
            if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod") {
              url = process.env.REACT_APP_CLIENT_URL;
            }

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