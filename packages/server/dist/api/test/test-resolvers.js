"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testResolvers = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _testModel = require("./test-model.js");

var _testModel2 = _interopRequireDefault(_testModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTest = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_, args, ctx, info) {
    var result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _testModel2.default.findOne({ username: args.input });

          case 2:
            result = _context.sent;
            return _context.abrupt("return", result);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getTest(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var testResolvers = exports.testResolvers = {
  Query: {
    beef: function beef() {
      return "Hello Beef";
    },
    getTest: getTest
  }
};