"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelsConnector = exports.L = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactApollo = require("react-apollo");

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var _normalizeErrors = require("../utils/normalize-errors");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  mutation levelCreate(\n    $levelName: String!\n    $levelImage: String\n    $levelDescription: String\n    $levelMode: String\n    $teachingLang: String\n    $usingLang: String\n  ) {\n    levelCreate(\n      input: {\n        levelName: $levelName\n        levelImage: $levelImage\n        levelDescription: $levelDescription\n        levelMode: $levelMode\n        teachingLang: $teachingLang\n        usingLang: $usingLang\n      }\n    ) {\n      _id\n      levelName\n      levelAuthor {\n        username\n      }\n      levelDescription\n      levelMode\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var L = function (_PureComponent) {
  (0, _inherits2["default"])(L, _PureComponent);

  function L() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, L);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(L)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "submit", function () {
      var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(values) {
        var _ref2, levelCreate;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _this.props.mutate({
                  variables: {
                    levelName: values.levelName,
                    levelDescription: values.levelDescription,
                    levelImage: values.levelImage,
                    levelMode: values.levelMode,
                    teachingLang: values.teachingLang,
                    usingLang: values.usingLang
                  }
                });

              case 3:
                _ref2 = _context.sent;
                levelCreate = _ref2.data;

                if (!levelCreate) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", levelCreate);

              case 7:
                if (!error) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", (0, _normalizeErrors.normalizeErrors)(error));

              case 9:
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](0);
                console.log("err: ", _context.t0);

              case 14:
                return _context.abrupt("return", null);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 11]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    return _this;
  }

  (0, _createClass2["default"])(L, [{
    key: "render",
    value: function render() {
      return this.props.children({
        submit: this.submit
      });
    }
  }]);
  return L;
}(_react.PureComponent);

exports.L = L;
var LevelCreateMutation = (0, _graphqlTag["default"])(_templateObject());
var LevelsConnector = (0, _reactApollo.graphql)(LevelCreateMutation)(L);
exports.LevelsConnector = LevelsConnector;