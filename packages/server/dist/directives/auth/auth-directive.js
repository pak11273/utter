"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthenticatedDirective = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _graphqlTools = require("graphql-tools");

var _jsonwebtoken = require("jsonwebtoken");

var jwt = _interopRequireWildcard(_jsonwebtoken);

var _graphql = require("graphql");

var _graphqlErrors = require("../../errors/graphql-errors");

var _config = require("../../config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isAuthenticatedDirective = exports.isAuthenticatedDirective = function (_SchemaDirectiveVisit) {
  (0, _inherits3.default)(isAuthenticatedDirective, _SchemaDirectiveVisit);

  function isAuthenticatedDirective() {
    (0, _classCallCheck3.default)(this, isAuthenticatedDirective);
    return (0, _possibleConstructorReturn3.default)(this, (isAuthenticatedDirective.__proto__ || Object.getPrototypeOf(isAuthenticatedDirective)).apply(this, arguments));
  }

  (0, _createClass3.default)(isAuthenticatedDirective, [{
    key: "visitObject",

    /* static getDirectiveDeclaration(directiveName, schema) { */
    /*   return new GraphQLDirective({ */
    /*     name: "auth", */
    /*     locations: [DirectiveLocation.FIELD_DEFINITION, DirectiveLocation.OBJECT] */
    /*   }) */
    /* } */
    value: function visitObject(type) {
      this.ensureFieldsWrapped(type);
      type._requiredAuthRole = this.args.requires;
    }
  }, {
    key: "visitFieldDefinition",
    value: function visitFieldDefinition(field) {
      var _field$resolve = field.resolve,
          resolve = _field$resolve === undefined ? _graphql.defaultFieldResolver : _field$resolve;

      field.resolve = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(source, _ref2, ctx, info) {
          var format = _ref2.format,
              otherArgs = (0, _objectWithoutProperties3.default)(_ref2, ["format"]);
          var token;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(!ctx || !ctx.req.headers || !ctx.req.headers.authorization)) {
                    _context.next = 2;
                    break;
                  }

                  throw new Error("No authorization token");

                case 2:
                  token = ctx.req.headers.authorization;


                  jwt.verify(token, _config2.default.env.JWT, function (err, decoded) {
                    if (err) {
                      console.log("err: ", err);
                      throw new Error("You are not authorized for this resource.");
                    } else {
                      ctx.user = decoded._id;
                    }
                  });
                  return _context.abrupt("return", resolve(source, otherArgs, ctx));

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function (_x, _x2, _x3, _x4) {
          return _ref.apply(this, arguments);
        };
      }();
    }
  }]);
  return isAuthenticatedDirective;
}(_graphqlTools.SchemaDirectiveVisitor);