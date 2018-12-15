"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userLoader = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _dataloader = require("dataloader");

var DataLoader = _interopRequireWildcard(_dataloader);

var _userModel = require("../api/user/user-model.js");

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userLoader = exports.userLoader = function userLoader() {
  return new DataLoader(function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(keys) {
      var users, userMap;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _userModel2.default.find({ id: mongoose.Types.ObjectId(_id) }).in(keys).exec();

            case 2:
              users = _context.sent;
              userMap = {};


              users.forEach(function (u) {
                userMap[u.id] = u;
              });

              // O(n) * O(1)
              return _context.abrupt("return", keys.map(function (k) {
                return userMap[k];
              }));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};