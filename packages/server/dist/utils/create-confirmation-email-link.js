"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEmailConfirmLink = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createEmailConfirmLink = exports.createEmailConfirmLink = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url, userId, redis) {
    var id;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = (0, _uuid.v4)();
            _context.next = 3;
            return redis.set(id, userId, "ex", 60 * 60 * 24);

          case 3:
            return _context.abrupt("return", url + "/api/users/confirm/" + id);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function createEmailConfirmLink(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(createEmailConfirmLink, "createEmailConfirmLink", "src/utils/create-confirmation-email-link.js");
  leaveModule(module);
})();

;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(createEmailConfirmLink, "createEmailConfirmLink", "src/utils/create-confirmation-email-link.js");
  leaveModule(module);
})();

;