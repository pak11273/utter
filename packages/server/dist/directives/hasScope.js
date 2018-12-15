"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasScopeDirective = undefined;

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

var hasScopeDirective = exports.hasScopeDirective = function (_SchemaDirectiveVisit) {
  (0, _inherits3.default)(hasScopeDirective, _SchemaDirectiveVisit);

  function hasScopeDirective() {
    (0, _classCallCheck3.default)(this, hasScopeDirective);
    return (0, _possibleConstructorReturn3.default)(this, (hasScopeDirective.__proto__ || Object.getPrototypeOf(hasScopeDirective)).apply(this, arguments));
  }

  (0, _createClass3.default)(hasScopeDirective, [{
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
      // Add some metadata to the object that the GraphQL server
      // can use later to display deprecation warnings.
      thing.isDeprecated = true;
      thing.deprecationReason = this.args.reason;
    }
  }]);
  return hasScopeDirective;
}(_graphqlTools.SchemaDirectiveVisitor);