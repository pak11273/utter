"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormattableDateDirective = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _apolloServer = require("apollo-server");

var _graphql = require("graphql");

var _dateformat = _interopRequireDefault(require("dateformat"));

var FormattableDateDirective = function (_SchemaDirectiveVisit) {
  (0, _inherits2.default)(FormattableDateDirective, _SchemaDirectiveVisit);

  function FormattableDateDirective() {
    (0, _classCallCheck2.default)(this, FormattableDateDirective);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FormattableDateDirective).apply(this, arguments));
  }

  (0, _createClass2.default)(FormattableDateDirective, [{
    key: "visitFieldDefinition",
    value: function visitFieldDefinition(field) {
      var _field$resolve = field.resolve,
          resolve = _field$resolve === void 0 ? _graphql.defaultFieldResolver : _field$resolve;
      var defaultFormat = this.args.defaultFormat;
      field.args.push({
        name: "format",
        type: _graphql.GraphQLString
      });

      field.resolve = function () {
        var _ref2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(source, _ref, context, info) {
          var format, otherArgs, date;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  format = _ref.format, otherArgs = (0, _objectWithoutProperties2.default)(_ref, ["format"]);
                  _context.next = 3;
                  return resolve.call(this, source, otherArgs, context, info);

                case 3:
                  date = _context.sent;
                  return _context.abrupt("return", (0, _dateformat.default)(date, format || defaultFormat));

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function (_x, _x2, _x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }();

      field.type = _graphql.GraphQLString;
    }
  }]);
  return FormattableDateDirective;
}(_apolloServer.SchemaDirectiveVisitor);

exports.FormattableDateDirective = FormattableDateDirective;