"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.betaTesterResolvers = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var yup = _interopRequireWildcard(require("yup"));

var _errorMessages = require("../shared/error-messages.js");

var _constants = require("../../constants");

var _formatYupError = require("../../utils/format-yup-error.js");

var _mail = require("../../mail/mail");

var _resolverFunctions = require("../shared/resolver-functions.js");

var _common = require("@utterzone/common");

var _betaTesterModel = _interopRequireDefault(require("../beta/beta-tester-model.js"));

var betaSignup = function () {
  var _ref3 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(_, _ref, _ref2, info) {
    var input, redis, url, betaTester;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            input = _ref.input;
            redis = _ref2.redis, url = _ref2.url;
            _context.prev = 2;
            betaTester = new _betaTesterModel.default(input);
            _context.next = 6;
            return betaTester.save();

          case 6:
            if (!betaTester) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", true);

          case 8:
            return _context.abrupt("return", false);

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](2);
            throw _context.t0;

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 11]]);
  }));

  return function betaSignup(_x, _x2, _x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var betaTesterResolvers = {
  Query: {},
  Mutation: {
    betaSignup: betaSignup
  }
};
exports.betaTesterResolvers = betaTesterResolvers;