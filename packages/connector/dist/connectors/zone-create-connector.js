"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZoneCreateConnector = exports.Z = undefined;

var _taggedTemplateLiteral2 = require("babel-runtime/helpers/taggedTemplateLiteral");

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(["\n  mutation zoneCreate(\n    $ageGroup: String!\n    $owner: String!\n    $zoneName: String!\n    $zoneImage: String\n    $zoneDescription: String\n    $teachingLang: String\n    $usingLang: String\n  ) {\n    zoneCreate(\n      input: {\n        ageGroup: $ageGroup\n        owner: $owner\n        zoneName: $zoneName\n        zoneImage: $zoneImage\n        zoneDescription: $zoneDescription\n        teachingLang: $teachingLang\n        usingLang: $usingLang\n      }\n    ) {\n      id\n      ageGroup\n      zoneName\n      zoneDescription\n      owner {\n        username\n      }\n    }\n  }\n"], ["\n  mutation zoneCreate(\n    $ageGroup: String!\n    $owner: String!\n    $zoneName: String!\n    $zoneImage: String\n    $zoneDescription: String\n    $teachingLang: String\n    $usingLang: String\n  ) {\n    zoneCreate(\n      input: {\n        ageGroup: $ageGroup\n        owner: $owner\n        zoneName: $zoneName\n        zoneImage: $zoneImage\n        zoneDescription: $zoneDescription\n        teachingLang: $teachingLang\n        usingLang: $usingLang\n      }\n    ) {\n      id\n      ageGroup\n      zoneName\n      zoneDescription\n      owner {\n        username\n      }\n    }\n  }\n"]); /* eslint no-unused-vars: 0 */

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactApollo = require("react-apollo");

var _graphqlTag = require("graphql-tag");

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _normalizeErrors = require("../utils/normalize-errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* NOTE: Since this will file will be used by both client and app, it cannot use React or React Native Commands ie. <div> <View> */
var Z = exports.Z = function (_PureComponent) {
  (0, _inherits3.default)(Z, _PureComponent);

  function Z() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Z);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Z.__proto__ || Object.getPrototypeOf(Z)).call.apply(_ref, [this].concat(args))), _this), _this.submit = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(values) {
        var _ref3, zoneCreate;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _this.props.mutate({
                  variables: {
                    ageGroup: values.ageGroup,
                    owner: values.owner,
                    zoneName: values.zoneName,
                    zoneDescription: values.zoneDescription,
                    zoneImage: values.zoneImage,
                    teachingLang: values.teachingLang,
                    usingLang: values.usingLang
                  }
                });

              case 3:
                _ref3 = _context.sent;
                zoneCreate = _ref3.data;

                console.log("connnector: ", values);

                if (!zoneCreate) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", zoneCreate);

              case 8:
                if (!error) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", (0, _normalizeErrors.normalizeErrors)(error));

              case 10:
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](0);

                console.log("err: ", _context.t0);

              case 15:
                return _context.abrupt("return", null);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[0, 12]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Z, [{
    key: "render",
    value: function render() {
      return this.props.children({ submit: this.submit });
    }
  }]);
  return Z;
}(_react.PureComponent);

var ZoneCreateMutation = (0, _graphqlTag2.default)(_templateObject);

var ZoneCreateConnector = exports.ZoneCreateConnector = (0, _reactApollo.graphql)(ZoneCreateMutation)(Z);
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Z, "Z", "src/connectors/zone-create-connector.js");
  reactHotLoader.register(ZoneCreateConnector, "ZoneCreateConnector", "src/connectors/zone-create-connector.js");
  reactHotLoader.register(ZoneCreateMutation, "ZoneCreateMutation", "src/connectors/zone-create-connector.js");
  leaveModule(module);
})();

;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Z, "Z", "src/connectors/zone-create-connector.js");
  reactHotLoader.register(ZoneCreateConnector, "ZoneCreateConnector", "src/connectors/zone-create-connector.js");
  reactHotLoader.register(ZoneCreateMutation, "ZoneCreateMutation", "src/connectors/zone-create-connector.js");
  leaveModule(module);
})();

;