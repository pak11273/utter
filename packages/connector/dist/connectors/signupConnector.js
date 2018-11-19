"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignupConnector = exports.C = undefined;

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

var _templateObject = (0, _taggedTemplateLiteral3.default)(["\n  mutation(\n    $username: String!\n    $email: String!\n    $password: String!\n    $passwordConfirmation: String!\n    $timezone: String\n  ) {\n    signup(\n      input: {\n        username: $username\n        email: $email\n        password: $password\n        passwordConfirmation: $passwordConfirmation\n        timezone: $timezone\n      }\n    ) {\n      token\n      error {\n        path\n        message\n      }\n    }\n  }\n"], ["\n  mutation(\n    $username: String!\n    $email: String!\n    $password: String!\n    $passwordConfirmation: String!\n    $timezone: String\n  ) {\n    signup(\n      input: {\n        username: $username\n        email: $email\n        password: $password\n        passwordConfirmation: $passwordConfirmation\n        timezone: $timezone\n      }\n    ) {\n      token\n      error {\n        path\n        message\n      }\n    }\n  }\n"]); /* eslint no-unused-vars: 0 */

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* NOTE: This file cannot use React or React Native Commands ie. <div> <View> */
var C = exports.C = function (_PureComponent) {
  (0, _inherits3.default)(C, _PureComponent);

  function C() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, C);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = C.__proto__ || Object.getPrototypeOf(C)).call.apply(_ref, [this].concat(args))), _this), _this.submit = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(values) {
        var response;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("values: ", values);
                _context.prev = 1;
                _context.next = 4;
                return _this.props.mutate({
                  variables: values
                });

              case 4:
                response = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);

                console.log("err: ", _context.t0);

              case 10:
                return _context.abrupt("return", null);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[1, 7]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(C, [{
    key: "render",
    value: function render() {
      return this.props.children({ submit: this.submit });
    }
  }]);
  return C;
}(_react.PureComponent);

var signupMutation = (0, _graphqlTag2.default)(_templateObject);

var SignupConnector = exports.SignupConnector = (0, _reactApollo.graphql)(signupMutation)(C);
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(C, "C", "src/connectors/signupConnector.js");
  reactHotLoader.register(SignupConnector, "SignupConnector", "src/connectors/signupConnector.js");
  reactHotLoader.register(signupMutation, "signupMutation", "src/connectors/signupConnector.js");
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

  reactHotLoader.register(C, "C", "src/connectors/signupConnector.js");
  reactHotLoader.register(SignupConnector, "SignupConnector", "src/connectors/signupConnector.js");
  reactHotLoader.register(signupMutation, "signupMutation", "src/connectors/signupConnector.js");
  leaveModule(module);
})();

;