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

var _templateObject = (0, _taggedTemplateLiteral3.default)(["\n  mutation signupMutation(\n    $username: String!\n    $email: String!\n    $password: String!\n    $passwordConfirmation: String!\n    $timezone: String\n  ) {\n    signup(\n      input: {\n        username: $username\n        email: $email\n        password: $password\n        passwordConfirmation: $passwordConfirmation\n        timezone: $timezone\n      }\n    ) {\n      token\n      user {\n        id\n        username\n        email\n        roles\n        scopes\n      }\n      error {\n        path\n        message\n      }\n    }\n  }\n"], ["\n  mutation signupMutation(\n    $username: String!\n    $email: String!\n    $password: String!\n    $passwordConfirmation: String!\n    $timezone: String\n  ) {\n    signup(\n      input: {\n        username: $username\n        email: $email\n        password: $password\n        passwordConfirmation: $passwordConfirmation\n        timezone: $timezone\n      }\n    ) {\n      token\n      user {\n        id\n        username\n        email\n        roles\n        scopes\n      }\n      error {\n        path\n        message\n      }\n    }\n  }\n"]); /* eslint no-unused-vars: 0 */

// actions


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

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactApollo = require("react-apollo");

var _graphqlTag = require("graphql-tag");

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _normalizeErrors = require("../utils/normalize-errors");

var _actions = require("../../../client/src/api/actions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* NOTE: Since this will file will be used by both client and app, it cannot use React or React Native Commands ie. <div> <View> */
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
        var _ref3, error, token, signup;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _this.props.mutate({
                  variables: {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                    passwordConfirmation: values["password confirmation"],
                    timezone: values.timezone
                  }
                });

              case 3:
                _ref3 = _context.sent;
                error = _ref3.data.signup.error;
                token = _ref3.data.signup.token;
                signup = _ref3.data.signup;

                if (!(token !== null)) {
                  _context.next = 10;
                  break;
                }

                _this.props.loadData(signup);
                return _context.abrupt("return", token);

              case 10:
                if (!error) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", (0, _normalizeErrors.normalizeErrors)(error));

              case 12:
                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](0);

                console.log("err: ", _context.t0);

              case 17:
                return _context.abrupt("return", null);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[0, 14]]);
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

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    loadData: _actions.loadData
  }, dispatch);
};

var SignupConnector = exports.SignupConnector = (0, _reactRedux.connect)(null, mapDispatchToProps)((0, _reactApollo.graphql)(signupMutation)(C));
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(C, "C", "src/connectors/signup-connector.js");
  reactHotLoader.register(SignupConnector, "SignupConnector", "src/connectors/signup-connector.js");
  reactHotLoader.register(signupMutation, "signupMutation", "src/connectors/signup-connector.js");
  reactHotLoader.register(mapDispatchToProps, "mapDispatchToProps", "src/connectors/signup-connector.js");
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

  reactHotLoader.register(C, "C", "src/connectors/signup-connector.js");
  reactHotLoader.register(SignupConnector, "SignupConnector", "src/connectors/signup-connector.js");
  reactHotLoader.register(signupMutation, "signupMutation", "src/connectors/signup-connector.js");
  reactHotLoader.register(mapDispatchToProps, "mapDispatchToProps", "src/connectors/signup-connector.js");
  leaveModule(module);
})();

;