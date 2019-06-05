"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeprecatedDirective = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _apolloServer = require("apollo-server");

var DeprecatedDirective = function (_SchemaDirectiveVisit) {
  (0, _inherits2["default"])(DeprecatedDirective, _SchemaDirectiveVisit);

  function DeprecatedDirective() {
    (0, _classCallCheck2["default"])(this, DeprecatedDirective);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(DeprecatedDirective).apply(this, arguments));
  }

  (0, _createClass2["default"])(DeprecatedDirective, [{
    key: "visitObject",
    value: function visitObject(object) {
      this._deprecate(object);
    }
  }, {
    key: "visitFieldDefinition",
    value: function visitFieldDefinition(field) {
      this._deprecate(field);
    }
  }, {
    key: "visitEnumValue",
    value: function visitEnumValue(value) {
      this._deprecate(value);
    }
  }, {
    key: "_deprecate",
    value: function _deprecate(thing) {
      thing.isDeprecated = true;
      thing.deprecationReason = this.args.reason;
    }
  }]);
  return DeprecatedDirective;
}(_apolloServer.SchemaDirectiveVisitor);

exports.DeprecatedDirective = DeprecatedDirective;