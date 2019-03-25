"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userByToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../../config"));

var _userModel = _interopRequireDefault(require("../user/user-model.js"));

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
var userByToken =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(token, cb) {
    var response, err;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _jsonwebtoken.default.verify(token, _config.default.env.JWT, function (err, decoded) {
              if (err) return err;

              if (decoded) {
                var userID = decoded._id;

                var user = _userModel.default.findOne({
                  _id: userID
                }).exec();

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
    }, _callee);
  }));

  return function userByToken(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.userByToken = userByToken;