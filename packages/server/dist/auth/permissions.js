"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permissions = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _graphqlShield = require("graphql-shield");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isAuthenticated = (0, _graphqlShield.rule)()(function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(parent, args, ctx, info) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("user: ", ctx.user);
            return _context.abrupt("return", ctx.user !== "blaal");

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}());

var isAdmin = function isAdmin() {
  return console.log("booyah");
};
var isEditor = function isEditor() {
  return console.log("booyah");
};

var permissions = exports.permissions = (0, _graphqlShield.shield)({
  Query: {},
  Mutation: {
    login: isAuthenticated
  }
});