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

var _userModel = _interopRequireDefault(require("../user/user-model.js"));

var _betaTesterModel = _interopRequireDefault(require("../beta/beta-tester-model.js"));

var betaAccess = function () {
  var _ref3 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(_, _ref, _ref2, info) {
    var key, redis, url;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            key = _ref.key;
            redis = _ref2.redis, url = _ref2.url;
            console.log("key: ", key);
            _context.prev = 3;

            if (!(key === process.env.BETA_KEY)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", "access");

          case 6:
            return _context.abrupt("return", "you don't have access");

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](3);
            throw _context.t0;

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 9]]);
  }));

  return function betaAccess(_x, _x2, _x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var betaSignup = function () {
  var _ref6 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(_, _ref4, _ref5, info) {
    var input, redis, url, betaTester;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            input = _ref4.input;
            redis = _ref5.redis, url = _ref5.url;
            _context2.prev = 2;
            betaTester = new _betaTesterModel.default(input);
            _context2.next = 6;
            return betaTester.save();

          case 6:
            if (!betaTester) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", true);

          case 8:
            return _context2.abrupt("return", false);

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](2);
            throw _context2.t0;

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 11]]);
  }));

  return function betaSignup(_x5, _x6, _x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();

var getBetaTesters = function () {
  var _ref8 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(_, args, _ref7, __) {
    var req, user, betaTesters;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            req = _ref7.req;

            if (req.session.userId) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", null);

          case 3:
            _context3.next = 5;
            return _userModel.default.findById(req.session.userId).lean();

          case 5:
            user = _context3.sent;
            console.log("user: ", user);

            if (!(user.roles.indexOf("uzAdmin") !== -1)) {
              _context3.next = 13;
              break;
            }

            _context3.next = 10;
            return _betaTesterModel.default.find().lean();

          case 10:
            betaTesters = _context3.sent;
            console.log("beta: ", betaTesters);
            return _context3.abrupt("return", betaTesters);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getBetaTesters(_x9, _x10, _x11, _x12) {
    return _ref8.apply(this, arguments);
  };
}();

var betaTesterResolvers = {
  Query: {
    betaAccess: betaAccess,
    getBetaTesters: getBetaTesters
  },
  Mutation: {
    betaSignup: betaSignup
  }
};
exports.betaTesterResolvers = betaTesterResolvers;