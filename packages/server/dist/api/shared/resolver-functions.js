"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userByToken = undefined;

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require("../../config");

var _config2 = _interopRequireDefault(_config);

var _userModel = require("../user/user-model.js");

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userByToken = exports.userByToken = function userByToken(ctx) {
  var token = ctx.req.headers.authorization || null;
  if (token) {
    var result = _jsonwebtoken2.default.verify(token, _config2.default.env.JWT, function (err, decoded) {
      if (err) return err;
      if (decoded) {
        var userID = decoded._id;
        var user = _userModel2.default.findOne({ _id: userID }).exec();
        return user;
      } else {
        return false;
      }
    });
    return result;
  }
};