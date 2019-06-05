"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotoAbstract = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var PhotoAbstract = function () {
  function PhotoAbstract() {
    (0, _classCallCheck2["default"])(this, PhotoAbstract);

    if ((this instanceof PhotoAbstract ? this.constructor : void 0) === PhotoAbstract) {
      throw new TypeError("This is an abstract class and cannot be instantiated.");
    }
  }

  (0, _createClass2["default"])(PhotoAbstract, [{
    key: "fetchPics",
    value: function fetchPics() {
      throw new TypeError("fetchPics cannot be used from the abstract class.  It must be overridden");
    }
  }], [{
    key: "convertData",
    value: function convertData(arr) {
      return arr.map(function (x) {
        return x.keyword;
      });
    }
  }]);
  return PhotoAbstract;
}();

exports.PhotoAbstract = PhotoAbstract;