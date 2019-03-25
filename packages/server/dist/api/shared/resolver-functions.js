"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userByToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../../config"));

var _userModel = _interopRequireDefault(require("../user/user-model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(token, cb) {
    var response, err;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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