"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForgotPasswordConnector = exports.F = void 0;

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

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  mutation forgotPasswordMutation($email: String!) {\n    forgotPassword(email: $email)\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var F = function (_PureComponent) {
  (0, _inherits2["default"])(F, _PureComponent);

  function F() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, F);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(F)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "submit", function () {
      var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(values) {
        var _ref2, forgotPassword;

        return _regenerator["default"].wrap(function _callee$(_context) {
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
                _ref2 = _context.sent;
                forgotPassword = _ref2.data.forgotPassword;
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
        }, _callee, null, [[0, 8]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    return _this;
  }

  (0, _createClass2["default"])(F, [{
    key: "render",
    value: function render() {
      return this.props.children({
        submit: this.submit
      });
    }
  }]);
  return F;
}(_react.PureComponent);

exports.F = F;
var forgotPasswordMutation = (0, _graphqlTag["default"])(_templateObject());
var ForgotPasswordConnector = (0, _reactApollo.graphql)(forgotPasswordMutation)(F);
exports.ForgotPasswordConnector = ForgotPasswordConnector;