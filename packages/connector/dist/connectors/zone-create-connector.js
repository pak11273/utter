"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZoneCreateConnector = exports.Z = void 0;

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
  var data = (0, _taggedTemplateLiteral2.default)(["\n  mutation zoneCreate(\n    $app: String\n    $courseLevel: Int\n    $ageGroup: String!\n    $owner: String!\n    $resources: String\n    $zoneName: String!\n    $zoneImage: String\n    $zoneDescription: String\n    $teachingLang: String\n    $usingLang: String\n  ) {\n    zoneCreate(\n      input: {\n        app: $app\n        courseLevel: $courseLevel\n        ageGroup: $ageGroup\n        owner: $owner\n        resources: $resources\n        zoneName: $zoneName\n        zoneImage: $zoneImage\n        zoneDescription: $zoneDescription\n        teachingLang: $teachingLang\n        usingLang: $usingLang\n      }\n    ) {\n      id\n      app\n      courseLevel\n      ageGroup\n      resources\n      zoneName\n      zoneDescription\n      owner {\n        username\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

/* NOTE: Since this will file will be used by both client and app, it cannot use React or React Native Commands ie. <div> <View> */
var Z =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(Z, _PureComponent);

  function Z() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Z);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Z)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "submit",
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(values) {
        var _ref2, zoneCreate;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _this.props.mutate({
                  variables: {
                    app: values.app,
                    courseLevel: values.courseLeve,
                    ageGroup: values.ageGroup,
                    owner: values.owner,
                    resources: values.resources,
                    zoneName: values.zoneName,
                    zoneDescription: values.zoneDescription,
                    zoneImage: values.zoneImage,
                    teachingLang: values.teachingLang,
                    usingLang: values.usingLang
                  }
                });

              case 3:
                _ref2 = _context.sent;
                zoneCreate = _ref2.data;

                if (!zoneCreate) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", zoneCreate);

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

  (0, _createClass2.default)(Z, [{
    key: "render",
    value: function render() {
      return this.props.children({
        submit: this.submit
      });
    }
  }]);
  return Z;
}(_react.PureComponent);

exports.Z = Z;
var ZoneCreateMutation = (0, _graphqlTag.default)(_templateObject());
var ZoneCreateConnector = (0, _reactApollo.graphql)(ZoneCreateMutation)(Z);
exports.ZoneCreateConnector = ZoneCreateConnector;