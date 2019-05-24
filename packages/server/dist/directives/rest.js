"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restDirective = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _apolloServer = require("apollo-server");

var restDirective = function (_SchemaDirectiveVisit) {
  (0, _inherits2.default)(restDirective, _SchemaDirectiveVisit);

  function restDirective() {
    (0, _classCallCheck2.default)(this, restDirective);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(restDirective).apply(this, arguments));
  }

  (0, _createClass2.default)(restDirective, [{
    key: "visitFieldDefinition",
    value: function visitFieldDefinition(field) {
      var url = this.args.url;

      field.resolve = function () {
        return fetch(url);
      };
    }
  }]);
  return restDirective;
}(_apolloServer.SchemaDirectiveVisitor);

exports.restDirective = restDirective;