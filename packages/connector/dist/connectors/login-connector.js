"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginConnector = exports.D = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n  mutation loginMutation($identifier: String!, $password: String!) {\n    login(input: {identifier: $identifier, password: $password}) {\n      token\n      user {\n        _id\n        username\n        email\n        roles\n        scopes\n      }\n      error {\n        path\n        message\n      }\n    }\n  }\n"], ["\n  mutation loginMutation($identifier: String!, $password: String!) {\n    login(input: {identifier: $identifier, password: $password}) {\n      token\n      user {\n        _id\n        username\n        email\n        roles\n        scopes\n      }\n      error {\n        path\n        message\n      }\n    }\n  }\n"]);

var _reactApollo = require("react-apollo");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _graphqlTag = require("graphql-tag");

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _normalizeErrors = require("../utils/normalize-errors");

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _brownies = require("brownies");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint no-unused-vars: 0 */

/* NOTE: Since this will file will be used by both client and app, it cannot use React or React Native Commands ie. <div> <View> */
var D = exports.D = function (_Component) {
  _inherits(D, _Component);

  function D() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, D);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = D.__proto__ || Object.getPrototypeOf(D)).call.apply(_ref, [this].concat(args))), _this), _this.submit = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(values) {
        var response, error, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _this.props.mutate({
                  variables: {
                    identifier: values["username or email"],
                    password: values.password
                  }
                });

              case 3:
                response = _context.sent;
                error = response.data.login.error;
                token = response.data.login.token;

                if ((0, _isEmpty2.default)(error)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", (0, _normalizeErrors.normalizeErrors)(error));

              case 8:
                return _context.abrupt("return", _extends({}, response.data.login, {
                  token: token,
                  error: error
                }));

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](0);

                console.log("err: ", _context.t0);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[0, 11]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(D, [{
    key: "render",
    value: function render() {
      return this.props.children({ submit: this.submit });
    }
  }]);

  return D;
}(_react.Component);

var loginMutation = (0, _graphqlTag2.default)(_templateObject);

var LoginConnector = exports.LoginConnector = (0, _reactApollo.graphql)(loginMutation)(D);