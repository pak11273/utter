"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignupConnector = exports.C = void 0;

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

var _brownies = require("brownies");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  mutation signupMutation(\n    $username: String!\n    $email: String!\n    $password: String!\n    $passwordConfirmation: String!\n    $timezone: String\n  ) {\n    signup(\n      input: {\n        username: $username\n        email: $email\n        password: $password\n        passwordConfirmation: $passwordConfirmation\n        timezone: $timezone\n      }\n    ) {\n      token\n      user {\n        _id\n        username\n        email\n        roles\n        scopes\n      }\n      error {\n        path\n        message\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

/* NOTE: Since this will file will be used by both client and app, it cannot use React or React Native Commands ie. <div> <View> */
var C =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(C, _PureComponent);

  function C() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, C);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(C)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "submit",
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(values) {
        var _ref2, error, token, signup;

        return _regenerator.default.wrap(function _callee$(_context) {
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
                _ref2 = _context.sent;
                error = _ref2.data.signup.error;
                token = _ref2.data.signup.token;
                signup = _ref2.data.signup;

                if (!(token !== null)) {
                  _context.next = 10;
                  break;
                }

                _brownies.local.user = data;
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
        }, _callee, null, [[0, 14]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    return _this;
  }

  (0, _createClass2.default)(C, [{
    key: "render",
    value: function render() {
      return this.props.children({
        submit: this.submit
      });
    }
  }]);
  return C;
}(_react.PureComponent);

exports.C = C;
var signupMutation = (0, _graphqlTag.default)(_templateObject());
var SignupConnector = (0, _reactApollo.graphql)(signupMutation)(C);
exports.SignupConnector = SignupConnector;