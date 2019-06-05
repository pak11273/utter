"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _adapter = require("../apps/carousel/adapter.js");

var _index = require("../index.js");

var SocketZones = function () {
  function SocketZones(zoneId, vocabulary, modifier) {
    (0, _classCallCheck2["default"])(this, SocketZones);
    this.zoneId = zoneId;
    this.vocabulary = vocabulary;
    this.modifier = modifier;
    this.pics = [];
    this.io = _index.io;
  }

  (0, _createClass2["default"])(SocketZones, [{
    key: "inititalizeCarousel",
    value: function inititalizeCarousel() {
      var _this = this;

      var PAdapter = new _adapter.PhotoAdapter({
        vocabulary: this.vocabulary,
        modifier: this.modifier
      });
      PAdapter.functions("fetchPixabay").then(function () {
        var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(res) {
          var reducedSizeRandomVocabulary;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  reducedSizeRandomVocabulary = res.map(function (arr) {
                    return arr.map(function (item) {
                      return {
                        word: item.word,
                        webformatHeight: item.webformatHeight,
                        webformatWidth: item.webformatWidth,
                        webformatURL: item.webformatURL
                      };
                    });
                  });
                  _this.pics = reducedSizeRandomVocabulary;
                  _context.next = 5;
                  return _this.io.on("connection", function (socket) {
                    socket.emit("init", _this.pics);
                  });

                case 5:
                  _context.next = 10;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](0);
                  return _context.abrupt("return", _context.t0);

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 7]]);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }]);
  return SocketZones;
}();

var _default = SocketZones;
exports["default"] = _default;