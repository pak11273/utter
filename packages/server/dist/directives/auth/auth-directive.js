"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthDirective = void 0;

var _apolloServer = require("apollo-server");

var jwt = _interopRequireWildcard(require("jsonwebtoken"));

var _graphql = require("graphql");

var _config = _interopRequireDefault(require("../../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AuthDirective =
/*#__PURE__*/
function (_SchemaDirectiveVisit) {
  _inherits(AuthDirective, _SchemaDirectiveVisit);

  function AuthDirective() {
    _classCallCheck(this, AuthDirective);

    return _possibleConstructorReturn(this, _getPrototypeOf(AuthDirective).apply(this, arguments));
  }

  _createClass(AuthDirective, [{
    key: "visitObject",
    value: function visitObject(obj) {
      var fields = obj.getFields();
      Object.keys(fields).forEach(function (fieldName) {
        var field = fields[fieldName];

        field.resolve =
        /*#__PURE__*/
        function () {
          var _ref = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(source, args, ctx, info) {
            var token;
            return regeneratorRuntime.wrap(function _callee$(_context) {
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
                    jwt.verify(token, _config.default.env.JWT, function (err, decoded) {
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
      field.resolve =
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _len,
            args,
            _key,
            ctx,
            token,
            _args2 = arguments;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
                jwt.verify(token, _config.default.env.JWT, function (err, decoded) {
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