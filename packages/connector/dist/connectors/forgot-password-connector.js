"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForgotPasswordConnector = exports.F = undefined;

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

var _templateObject = (0, _taggedTemplateLiteral3.default)(["\n  mutation forgotPasswordMutation($email: String!) {\n    forgotPassword(email: $email)\n  }\n"], ["\n  mutation forgotPasswordMutation($email: String!) {\n    forgotPassword(email: $email)\n  }\n"]); /* eslint no-unused-vars: 0 */

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
var F = exports.F = function (_PureComponent) {
  (0, _inherits3.default)(F, _PureComponent);

  function F() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, F);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = F.__proto__ || Object.getPrototypeOf(F)).call.apply(_ref, [this].concat(args))), _this), _this.submit = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(values) {
        var _ref3, forgotPassword;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _this.props.mutate({
                  variables: {
                    email: values.email
                  }
                });

              case 3:
                _ref3 = _context.sent;
                forgotPassword = _ref3.data.forgotPassword;
                return _context.abrupt("return", null);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);

                console.log("err: ", _context.t0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[0, 8]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(F, [{
    key: "render",
    value: function render() {
      return this.props.children({ submit: this.submit });
    }
  }]);
  return F;
}(_react.PureComponent);

var forgotPasswordMutation = (0, _graphqlTag2.default)(_templateObject);
var ForgotPasswordConnector = exports.ForgotPasswordConnector = (0, _reactApollo.graphql)(forgotPasswordMutation)(F);
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(F, "F", "src/connectors/forgot-password-connector.js");
  reactHotLoader.register(ForgotPasswordConnector, "ForgotPasswordConnector", "src/connectors/forgot-password-connector.js");
  reactHotLoader.register(forgotPasswordMutation, "forgotPasswordMutation", "src/connectors/forgot-password-connector.js");
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

  reactHotLoader.register(F, "F", "src/connectors/forgot-password-connector.js");
  reactHotLoader.register(ForgotPasswordConnector, "ForgotPasswordConnector", "src/connectors/forgot-password-connector.js");
  reactHotLoader.register(forgotPasswordMutation, "forgotPasswordMutation", "src/connectors/forgot-password-connector.js");
  leaveModule(module);
})();

;