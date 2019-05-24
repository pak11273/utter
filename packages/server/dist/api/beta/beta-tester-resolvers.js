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

var betaUpdate = function () {
  var _ref9 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(_, _ref7, _ref8, info) {
    var input, redis, url, betaTester;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            input = _ref7.input;
            redis = _ref8.redis, url = _ref8.url;
            console.log("input: ", input);
            _context3.prev = 3;
            _context3.next = 6;
            return _betaTesterModel.default.findOneAndUpdate({
              _id: input._id
            }, {
              ageGroup: input.ageGroup,
              chosen: input.chosen,
              country: input.country,
              currentlyLearning: input.currentlyLearning,
              dayLearningHrs: input.dayLearningHrs,
              email: input.email,
              gender: input.gender,
              howLongLearning: input.howLongLearning,
              lastName: input.lastName,
              linkedIn: input.linkedIn,
              languagesFluent: input.languagesFluent,
              nativeLang: input.nativeLang,
              whyLearning: input.whyLearning
            }, {
              new: true
            }).exec();

          case 6:
            betaTester = _context3.sent;
            console.log("betatester: ", betaTester);

            if (!betaTester) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", betaTester);

          case 10:
            _context3.next = 15;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](3);
            throw _context3.t0;

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 12]]);
  }));

  return function betaUpdate(_x9, _x10, _x11, _x12) {
    return _ref9.apply(this, arguments);
  };
}();

var getBetaTesters = function () {
  var _ref11 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4(_, args, _ref10, __) {
    var req, user, betaTesters, formatted;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            req = _ref10.req;

            if (req.session.userId) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", null);

          case 3:
            _context4.next = 5;
            return _userModel.default.findById(req.session.userId).lean();

          case 5:
            user = _context4.sent;

            if (!(user.roles.indexOf("uzAdmin") !== -1)) {
              _context4.next = 12;
              break;
            }

            _context4.next = 9;
            return _betaTesterModel.default.find().lean();

          case 9:
            betaTesters = _context4.sent;
            formatted = betaTesters.map(function (item) {
              var createdAt = new Date(item.createdAt).toDateString();
              var updatedAt = new Date(item.updatedAt).toDateString();
              item.createdAt = createdAt;
              item.updatedAt = updatedAt;
              return item;
            });
            return _context4.abrupt("return", formatted);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getBetaTesters(_x13, _x14, _x15, _x16) {
    return _ref11.apply(this, arguments);
  };
}();

var betaTesterResolvers = {
  Query: {
    betaAccess: betaAccess,
    getBetaTesters: getBetaTesters
  },
  Mutation: {
    betaSignup: betaSignup,
    betaUpdate: betaUpdate
  }
};
exports.betaTesterResolvers = betaTesterResolvers;