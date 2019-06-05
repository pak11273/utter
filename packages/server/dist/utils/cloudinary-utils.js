"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPublicId = void 0;

var getPublicId = function getPublicId(url) {
  var split = url.split("/");
  var lastIndex = split[split.length - 1];
  lastIndex = lastIndex.substring(0, lastIndex.lastIndexOf("."));
  return lastIndex;
};

exports.getPublicId = getPublicId;