"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthDirective = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _apolloServer = require("apollo-server");

var jwt = _interopRequireWildcard(require("jsonwebtoken"));

var _graphql = require("graphql");

var _config = _interopRequireDefault(require("../../config"));

var AuthDirective = function (_SchemaDirectiveVisit) {
  (0, _inherits2["default"])(AuthDirective, _SchemaDirectiveVisit);

  function AuthDirective() {
    (0, _classCallCheck2["default"])(this, AuthDirective);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(AuthDirective).apply(this, arguments));
  }

  (0, _createClass2["default"])(AuthDirective, [{
    key: "visitObject",
    value: function visitObject(obj) {
      var fields = obj.getFields();
      Object.keys(fields).forEach(function (fieldName) {
        var field = fields[fieldName];

        field.resolve = function () {
          var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(source, args, ctx, info) {
            var token;
            return _regenerator["default"].wrap(function _callee$(_context) {
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
                    jwt.verify(token, _config["default"].env.JWT, function (err, decoded) {
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
            }, _callee, null, [[3, 8]]);
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
          resolve = _field$resolve === void 0 ? _graphql.defaultFieldResolver : _field$resolve;
      field.resolve = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2() {
        var _len,
            args,
            _key,
            ctx,
            token,
            _args2 = arguments;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                for (_len = _args2.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = _args2[_key];
                }

                ctx = args[2];
                console.log("ctx: ", ctx.req);

                if (!(!ctx || !ctx.req.headers || !ctx.req.headers.authorization || ctx.req.headers.authorization === "null")) {
                  _context2.next = 5;
                  break;
                }

                throw new Error("You must be registered to view this page.");

              case 5:
                token = ctx.req.headers.authorization;
                _context2.prev = 6;
                jwt.verify(token, _config["default"].env.JWT, function (err, decoded) {
                  if (err) {
                    throw new Error("Something is wrong with your credentials.  Please contact technical support.");
                  } else {
                    ctx.user = decoded._id;
                  }
                });
                return _context2.abrupt("return", resolve.apply(this, args));

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](6);
                return _context2.abrupt("return", _context2.t0);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[6, 11]]);
      }));
    }
  }]);
  return AuthDirective;
}(_apolloServer.SchemaDirectiveVisitor);

exports.AuthDirective = AuthDirective;