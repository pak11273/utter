"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Google = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _photoAbstract = require("./photo-abstract.js");

var Google = function (_PhotoAbstract) {
  (0, _inherits2["default"])(Google, _PhotoAbstract);

  function Google() {
    (0, _classCallCheck2["default"])(this, Google);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Google).apply(this, arguments));
  }

  (0, _createClass2["default"])(Google, [{
    key: "fetchPics",
    value: function fetchPics(arr) {
      return arr;
    }
  }]);
  return Google;
}(_photoAbstract.PhotoAbstract);

exports.Google = Google;