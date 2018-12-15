"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restDirective = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _graphqlTools = require("graphql-tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var restDirective = exports.restDirective = function (_SchemaDirectiveVisit) {
  (0, _inherits3.default)(restDirective, _SchemaDirectiveVisit);

  function restDirective() {
    (0, _classCallCheck3.default)(this, restDirective);
    return (0, _possibleConstructorReturn3.default)(this, (restDirective.__proto__ || Object.getPrototypeOf(restDirective)).apply(this, arguments));
  }

  (0, _createClass3.default)(restDirective, [{
    key: "visitFieldDefinition",
    value: function visitFieldDefinition(field) {
      var url = this.args.url;

      field.resolve = function () {
        return fetch(url);
      };
    }
  }]);
  return restDirective;
}(_graphqlTools.SchemaDirectiveVisitor);