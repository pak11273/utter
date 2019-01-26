"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userByToken = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require("../../config");

var _config2 = _interopRequireDefault(_config);

var _userModel = require("../user/user-model.js");

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
** 
** @userByToken 
**
** usage: 
** userByToken(token, (err, res) => {} 
**
** notes: check for token first
**
** const token = ctx.req.headers.authorization
** if (token === "null") {
**   return new Error("You need to be registered to view this resource.")
** }
**
*/
var userByToken = exports.userByToken = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(token, cb) {
    var response, err;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _jsonwebtoken2.default.verify(token, _config2.default.env.JWT, function (err, decoded) {
              if (err) return err;
              if (decoded) {
                var userID = decoded._id;
                var user = _userModel2.default.findOne({ _id: userID }).exec();
                return user;
              }
            });

          case 2:
            response = _context.sent;


            if (response === Error) {
              err = response;
            } else {
              err = null;
            }

            return _context.abrupt("return", cb(err, response));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function userByToken(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();