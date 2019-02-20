"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testResolvers = undefined;

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

var addTest = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_, args, ctx, info) {
    var newTest, result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            newTest = new _testModel2.default({ testName: args.name });
            _context2.next = 3;
            return newTest.save();

          case 3:
            result = _context2.sent;
            return _context2.abrupt("return", result);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function addTest(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var deleteTest = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_, args, ctx, info) {
    var result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _testModel2.default.findByIdAndRemove(args.id);

          case 2:
            result = _context3.sent;
            return _context3.abrupt("return", result);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function deleteTest(_x9, _x10, _x11, _x12) {
    return _ref3.apply(this, arguments);
  };
}();

var updateTest = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_, args, ctx, info) {
    var found;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _testModel2.default.findByIdAndUpdate(args.id, { $set: { testName: args.name } }, { new: true });

          case 2:
            found = _context4.sent;
            return _context4.abrupt("return", found);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function updateTest(_x13, _x14, _x15, _x16) {
    return _ref4.apply(this, arguments);
  };
}();

var getTests = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_, args, ctx, info) {
    var result;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _testModel2.default.find();

          case 2:
            result = _context5.sent;
            return _context5.abrupt("return", result);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function getTests(_x17, _x18, _x19, _x20) {
    return _ref5.apply(this, arguments);
  };
}();

var testResolvers = exports.testResolvers = {
  Query: {
    beef: function beef() {
      return "Hello Beef";
    },
    getTest: getTest,
    getTests: getTests
  },
  Mutation: {
    addTest: addTest,
    updateTest: updateTest
  }
};
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(testResolvers, "testResolvers", "src/api/test/test-resolvers.js");
  reactHotLoader.register(getTest, "getTest", "src/api/test/test-resolvers.js");
  reactHotLoader.register(addTest, "addTest", "src/api/test/test-resolvers.js");
  reactHotLoader.register(deleteTest, "deleteTest", "src/api/test/test-resolvers.js");
  reactHotLoader.register(updateTest, "updateTest", "src/api/test/test-resolvers.js");
  reactHotLoader.register(getTests, "getTests", "src/api/test/test-resolvers.js");
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

  reactHotLoader.register(testResolvers, "testResolvers", "src/api/test/test-resolvers.js");
  reactHotLoader.register(getTest, "getTest", "src/api/test/test-resolvers.js");
  reactHotLoader.register(addTest, "addTest", "src/api/test/test-resolvers.js");
  reactHotLoader.register(deleteTest, "deleteTest", "src/api/test/test-resolvers.js");
  reactHotLoader.register(updateTest, "updateTest", "src/api/test/test-resolvers.js");
  reactHotLoader.register(getTests, "getTests", "src/api/test/test-resolvers.js");
  leaveModule(module);
})();

;