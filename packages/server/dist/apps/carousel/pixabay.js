"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pixabay = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _photoAbstract = require("./photo-abstract.js");

var _brownies = require("brownies");

var _shuffleArray = require("../../utils/shuffle-array.js");

var fetch = require("node-fetch");

var Pixabay = function (_PhotoAbstract) {
  (0, _inherits2["default"])(Pixabay, _PhotoAbstract);

  function Pixabay(data) {
    var _this;

    (0, _classCallCheck2["default"])(this, Pixabay);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Pixabay).call(this, data));
    _this.data = data;
    _this.keys = process.env.PIXABAY_API_KEYS;
    _this.keyCount = 0;
    _this.keys = process.env.PIXABAY_API_KEYS.split(",");
    return _this;
  }

  (0, _createClass2["default"])(Pixabay, [{
    key: "fetchPics",
    value: function () {
      var _fetchPics = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3(data) {
        var _this2 = this;

        var words, arr, urls;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.loading = true;
                words = _photoAbstract.PhotoAbstract.convertData(data.vocabulary);
                (0, _shuffleArray.shuffleArray)(words);
                _context3.next = 5;
                return words.map(function () {
                  var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2(word) {
                    return _regenerator["default"].wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.prev = 0;
                            return _context2.abrupt("return", new Promise(function (resolve) {
                              var modifier = data.modifier || "";
                              setTimeout((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee() {
                                var url, response, fetched, imageUrls;
                                return _regenerator["default"].wrap(function _callee$(_context) {
                                  while (1) {
                                    switch (_context.prev = _context.next) {
                                      case 0:
                                        url = "https://pixabay.com/api/?key=".concat(_this2.keys[_this2.keyCount], "&q=").concat(word, "&image_type=photo&pretty=true&per_page=").concat(encodeURIComponent(3), "&safesearch=true");
                                        _context.next = 3;
                                        return fetch(url);

                                      case 3:
                                        response = _context.sent;
                                        _context.next = 6;
                                        return response.json();

                                      case 6:
                                        fetched = _context.sent;
                                        imageUrls = fetched.hits.map(function (item) {
                                          return (0, _objectSpread2["default"])({
                                            word: word
                                          }, item);
                                        });

                                        if (_this2.keyCount + 1 !== _this2.keyCount.length - 1) {
                                          _this2.keyCount + 1;
                                        } else {
                                          _this2.keyCount = 0;
                                        }

                                        resolve(imageUrls);

                                      case 10:
                                      case "end":
                                        return _context.stop();
                                    }
                                  }
                                }, _callee);
                              })), 1000);
                            }));

                          case 4:
                            _context2.prev = 4;
                            _context2.t0 = _context2["catch"](0);
                            return _context2.abrupt("return", _context2.t0);

                          case 7:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2, null, [[0, 4]]);
                  }));

                  return function (_x2) {
                    return _ref.apply(this, arguments);
                  };
                }());

              case 5:
                arr = _context3.sent;
                _context3.next = 8;
                return Promise.all(arr);

              case 8:
                urls = _context3.sent;
                return _context3.abrupt("return", urls);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function fetchPics(_x) {
        return _fetchPics.apply(this, arguments);
      }

      return fetchPics;
    }()
  }]);
  return Pixabay;
}(_photoAbstract.PhotoAbstract);

exports.Pixabay = Pixabay;