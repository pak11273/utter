"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormattableDateDirective = undefined;

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

var _graphql = require("graphql");

var _dateformat = require("dateformat");

var _dateformat2 = _interopRequireDefault(_dateformat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormattableDateDirective = exports.FormattableDateDirective = function (_SchemaDirectiveVisit) {
  (0, _inherits3.default)(FormattableDateDirective, _SchemaDirectiveVisit);

  function FormattableDateDirective() {
    (0, _classCallCheck3.default)(this, FormattableDateDirective);
    return (0, _possibleConstructorReturn3.default)(this, (FormattableDateDirective.__proto__ || Object.getPrototypeOf(FormattableDateDirective)).apply(this, arguments));
  }

  (0, _createClass3.default)(FormattableDateDirective, [{
    key: "visitFieldDefinition",
    value: function visitFieldDefinition(field) {
      var _field$resolve = field.resolve,
          resolve = _field$resolve === undefined ? _graphql.defaultFieldResolver : _field$resolve;
      var defaultFormat = this.args.defaultFormat;

      // Add an additional `format` argument to the field:

      field.args.push({
        name: "format",
        type: _graphql.GraphQLString
      });

      field.resolve = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(source, _ref2, context, info) {
          var format = _ref2.format,
              otherArgs = (0, _objectWithoutProperties3.default)(_ref2, ["format"]);
          var date;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return resolve.call(this, source, otherArgs, context, info);

                case 2:
                  date = _context.sent;
                  return _context.abrupt("return", (0, _dateformat2.default)(date, format || defaultFormat));

                case 4:
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

      // Update the result type of the field, since now it returns
      // a String instead of a Date:
      field.type = _graphql.GraphQLString;
    }
  }]);
  return FormattableDateDirective;
}(_graphqlTools.SchemaDirectiveVisitor);