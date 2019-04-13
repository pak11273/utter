"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangePasswordConnector = exports.N = void 0;

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

var _reactApollo = require("react-apollo");

var _react = _interopRequireWildcard(require("react"));

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var _normalizeErrors = require("../utils/normalize-errors.js");

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _brownies = require("brownies");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  mutation changePasswordMutation(\n    $password: String!\n    $passwordConfirmation: String\n    $token: String!\n  ) {\n    changePassword(\n      input: {\n        password: $password\n        passwordConfirmation: $passwordConfirmation\n        token: $token\n      }\n    ) {\n      token\n      error {\n        path\n        message\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

/* import history from "../index.js" */

/* NOTE: Since this will file will be used by both client and app, it cannot use React or React Native Commands ie. <div> <View> */
var N =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(N, _PureComponent);

  function N() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, N);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(N)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "submit",
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(values) {
        var data, token;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _this.props.mutate({
                  variables: {
                    password: values.password,
                    passwordConfirmation: values["password confirmation"],
                    token: values.token
                  }
                });

              case 3:
                data = _context.sent;
                token = data.data.changePassword.token;

                if (token) {
                  _brownies.local.AUTH_TOKEN = token;
                }

                return _context.abrupt("return", data);

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", _context.t0);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    return _this;
  }

  (0, _createClass2.default)(N, [{
    key: "render",
    value: function render() {
      return this.props.children({
        submit: this.submit
      });
    }
  }]);
  return N;
}(_react.PureComponent);

exports.N = N;
var changePasswordMutation = (0, _graphqlTag.default)(_templateObject());
var ChangePasswordConnector = (0, _reactApollo.graphql)(changePasswordMutation)(N);
exports.ChangePasswordConnector = ChangePasswordConnector;