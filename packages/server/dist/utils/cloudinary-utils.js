"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPublicId = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var getPublicId = function getPublicId(url) {
  var split = url.split("/");
  var lastIndex = split[split.length - 1];
  lastIndex = lastIndex.substring(0, lastIndex.lastIndexOf("."));
  console.log((0, _typeof2.default)(lastIndex));
  console.log(lastIndex);
  return lastIndex;
};

exports.getPublicId = getPublicId;