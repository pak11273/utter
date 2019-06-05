"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotoAdapter = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _pixabay = require("./pixabay.js");

var PhotoAdapter = function PhotoAdapter(data) {
  (0, _classCallCheck2["default"])(this, PhotoAdapter);
  var pixabayService = new _pixabay.Pixabay(data);

  this.functions = function (method) {
    if (method === "fetchPixabay") {
      return pixabayService.fetchPics(data);
    }
  };
};

exports.PhotoAdapter = PhotoAdapter;