"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthDirective = undefined;

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

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _apolloServer = require("apollo-server");

var _jsonwebtoken = require("jsonwebtoken");

var jwt = _interopRequireWildcard(_jsonwebtoken);

var _graphql = require("graphql");

var _config = require("../../config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthDirective = exports.AuthDirective = function (_SchemaDirectiveVisit) {
  (0, _inherits3.default)(AuthDirective, _SchemaDirectiveVisit);

  function AuthDirective() {
    (0, _classCallCheck3.default)(this, AuthDirective);
    return (0, _possibleConstructorReturn3.default)(this, (AuthDirective.__proto__ || Object.getPrototypeOf(AuthDirective)).apply(this, arguments));
  }

  (0, _createClass3.default)(AuthDirective, [{
    key: "visitObject",
    value: function visitObject(obj) {
      var fields = obj.getFields();

      Object.keys(fields).forEach(function (fieldName) {
        var field = fields[fieldName];

        field.resolve = function () {
          var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(source, args, ctx, info) {
            var token;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!(!ctx || !ctx.req.headers || !ctx.req.headers.authorization || ctx.req.headers.authorization === "null")) {
                      _context.next = 2;
                      break;
                    }

                    throw new Error("You must be registered to view this page.");

                  case 2:
                    token = ctx.req.headers.authorization;
                    _context.prev = 3;

                    jwt.verify(token, _config2.default.env.JWT, function (err, decoded) {
                      if (err) {
                        throw new Error("Something is wrong with your credentials.  Please contact technical support.");
                      } else {
                        ctx.user = decoded._id;
                      }
                    });
                    return _context.abrupt("return", source[fieldName]);

                  case 8:
                    _context.prev = 8;
                    _context.t0 = _context["catch"](3);
                    return _context.abrupt("return", _context.t0);

                  case 11:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this, [[3, 8]]);
          }));

          return function (_x, _x2, _x3, _x4) {
            return _ref.apply(this, arguments);
          };
        }();
      });
    }
  }, {
    key: "visitFieldDefinition",
    value: function visitFieldDefinition(field) {
      var _field$resolve = field.resolve,
          resolve = _field$resolve === undefined ? _graphql.defaultFieldResolver : _field$resolve;


      field.resolve = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var ctx, token;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  ctx = args[2];

                  console.log("ctx: ", ctx.req);

                  if (!(!ctx || !ctx.req.headers || !ctx.req.headers.authorization || ctx.req.headers.authorization === "null")) {
                    _context2.next = 4;
                    break;
                  }

                  throw new Error("You must be registered to view this page.");

                case 4:
                  token = ctx.req.headers.authorization;
                  _context2.prev = 5;

                  jwt.verify(token, _config2.default.env.JWT, function (err, decoded) {
                    if (err) {
                      throw new Error("Something is wrong with your credentials.  Please contact technical support.");
                    } else {
                      ctx.user = decoded._id;
                    }
                  });
                  return _context2.abrupt("return", resolve.apply(this, args));

                case 10:
                  _context2.prev = 10;
                  _context2.t0 = _context2["catch"](5);
                  return _context2.abrupt("return", _context2.t0);

                case 13:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[5, 10]]);
        }));

        return function () {
          return _ref2.apply(this, arguments);
        };
      }();
    }
  }]);
  return AuthDirective;
}(_apolloServer.SchemaDirectiveVisitor);

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AuthDirective, "AuthDirective", "src/directives/auth/auth-directive.js");
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

  reactHotLoader.register(AuthDirective, "AuthDirective", "src/directives/auth/auth-directive.js");
  leaveModule(module);
})();

;