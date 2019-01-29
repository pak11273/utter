"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeprecatedDirective = undefined;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeprecatedDirective = exports.DeprecatedDirective = function (_SchemaDirectiveVisit) {
  (0, _inherits3.default)(DeprecatedDirective, _SchemaDirectiveVisit);

  function DeprecatedDirective() {
    (0, _classCallCheck3.default)(this, DeprecatedDirective);
    return (0, _possibleConstructorReturn3.default)(this, (DeprecatedDirective.__proto__ || Object.getPrototypeOf(DeprecatedDirective)).apply(this, arguments));
  }

  (0, _createClass3.default)(DeprecatedDirective, [{
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
  return DeprecatedDirective;
}(_apolloServer.SchemaDirectiveVisitor);

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(DeprecatedDirective, "DeprecatedDirective", "src/directives/deprecated/deprecated.js");
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

  reactHotLoader.register(DeprecatedDirective, "DeprecatedDirective", "src/directives/deprecated/deprecated.js");
  leaveModule(module);
})();

;