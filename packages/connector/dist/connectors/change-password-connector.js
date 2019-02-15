"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangePasswordConnector = exports.N = undefined;

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

var _templateObject = (0, _taggedTemplateLiteral3.default)(["\n  mutation changePasswordMutation(\n    $password: String!\n    $passwordConfirmation: String\n    $token: String!\n  ) {\n    changePassword(\n      input: {\n        password: $password\n        passwordConfirmation: $passwordConfirmation\n        token: $token\n      }\n    ) {\n      token\n      error {\n        path\n        message\n      }\n    }\n  }\n"], ["\n  mutation changePasswordMutation(\n    $password: String!\n    $passwordConfirmation: String\n    $token: String!\n  ) {\n    changePassword(\n      input: {\n        password: $password\n        passwordConfirmation: $passwordConfirmation\n        token: $token\n      }\n    ) {\n      token\n      error {\n        path\n        message\n      }\n    }\n  }\n"]); /* eslint no-unused-vars: 0 */

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _reactApollo = require("react-apollo");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _graphqlTag = require("graphql-tag");

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _normalizeErrors = require("../utils/normalize-errors.js");

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* import history from "../index.js" */

/* NOTE: Since this will file will be used by both client and app, it cannot use React or React Native Commands ie. <div> <View> */
var N = exports.N = function (_PureComponent) {
  (0, _inherits3.default)(N, _PureComponent);

  function N() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, N);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = N.__proto__ || Object.getPrototypeOf(N)).call.apply(_ref, [this].concat(args))), _this), _this.submit = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(values) {
        var data, token;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("val: ", values);
                _context.prev = 1;
                _context.next = 4;
                return _this.props.mutate({
                  variables: {
                    password: values.password,
                    passwordConfirmation: values["password confirmation"],
                    token: values.token
                  }
                });

              case 4:
                data = _context.sent;
                token = data.data.changePassword.token;

                if (token) {
                  localStorage.setItem("AUTH_TOKEN", token);
                }
                return _context.abrupt("return", null);

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](1);

                console.log("err: ", _context.t0);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[1, 10]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(N, [{
    key: "render",
    value: function render() {
      return this.props.children({ submit: this.submit });
    }
  }]);
  return N;
}(_react.PureComponent);

var changePasswordMutation = (0, _graphqlTag2.default)(_templateObject);
var ChangePasswordConnector = exports.ChangePasswordConnector = (0, _reactApollo.graphql)(changePasswordMutation)(N);
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(N, "N", "src/connectors/change-password-connector.js");
  reactHotLoader.register(ChangePasswordConnector, "ChangePasswordConnector", "src/connectors/change-password-connector.js");
  reactHotLoader.register(changePasswordMutation, "changePasswordMutation", "src/connectors/change-password-connector.js");
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

  reactHotLoader.register(N, "N", "src/connectors/change-password-connector.js");
  reactHotLoader.register(ChangePasswordConnector, "ChangePasswordConnector", "src/connectors/change-password-connector.js");
  reactHotLoader.register(changePasswordMutation, "changePasswordMutation", "src/connectors/change-password-connector.js");
  leaveModule(module);
})();

;