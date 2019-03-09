"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasScopeDirective = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

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

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _jsonwebtoken = require("jsonwebtoken");

var jwt = _interopRequireWildcard(_jsonwebtoken);

var _lodash = require("lodash");

var _apolloServer = require("apollo-server");

var _resolverFunctions = require("../../api/shared/resolver-functions.js");

var _graphql = require("graphql");

var _rolesSchema = require("@utterzone/common/dist/auth/roles-schema");

var _rolesSchema2 = _interopRequireDefault(_rolesSchema);

var _userModel = require("../../api/user/user-model.js");

var _userModel2 = _interopRequireDefault(_userModel);

var _courseModel = require("../../api/course/course-model.js");

var _courseModel2 = _interopRequireDefault(_courseModel);

var _levelModel = require("../../api/level/level-model.js");

var _levelModel2 = _interopRequireDefault(_levelModel);

var _termModel = require("../../api/term/term-model.js");

var _termModel2 = _interopRequireDefault(_termModel);

var _testModel = require("../../api/test/test-model.js");

var _testModel2 = _interopRequireDefault(_testModel);

var _zoneModel = require("../../api/zone/zone-model.js");

var _zoneModel2 = _interopRequireDefault(_zoneModel);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// register resources


// resources
/* import { AuthorizationError } from "./errors"; */
var resources = [{ user: _userModel2.default }, { course: _courseModel2.default }, { level: _levelModel2.default }, { term: _termModel2.default }, { test: _testModel2.default }, { zone: _zoneModel2.default }];

var hasScopeDirective = exports.hasScopeDirective = function (_SchemaDirectiveVisit) {
  (0, _inherits3.default)(hasScopeDirective, _SchemaDirectiveVisit);

  function hasScopeDirective() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, hasScopeDirective);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = hasScopeDirective.__proto__ || Object.getPrototypeOf(hasScopeDirective)).call.apply(_ref, [this].concat(args))), _this), _this.arrayContainsAnotherArray = function (needle, haystack) {
      for (var i = 0; i < needle.length; i++) {
        if (haystack.indexOf(needle[i]) === -1) return false;
      }
      return true;
    }, _this.hasPermission = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(rules, user, resourceId, expectedScope) {
        var roles, dynamicRules, combinedDynamicRules, dynamicKeys, combinedRules, allPermissions, containsPermission, userId, key, modelSlice, modelName, Model, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                roles = user.roles;

                // Users without roles get "guest" applied

                if (!roles) roles = ["guest"];

                // Flatten all dynamic rules of the user
                dynamicRules = [];

                roles.map(function (role) {
                  if (rules[role].dynamic) {
                    dynamicRules.push(rules[role].dynamic);
                  }
                });

                combinedDynamicRules = (0, _lodash.flatten)(dynamicRules);

                // Array of Keys for combinedDynamicRules

                dynamicKeys = (0, _lodash.uniq)(combinedDynamicRules.map(function (obj) {
                  return Object.keys(obj)[0];
                }));

                // Static rules setup,flattened all user's static permissions

                combinedRules = [];

                roles.map(function (role) {
                  combinedRules.push(rules[role].static);
                });
                combinedRules.push(dynamicKeys); //append dynamic keys

                allPermissions = (0, _lodash.uniq)((0, _lodash.flatten)(combinedRules));

                // See if user's roles has the permissions from expectedScope

                containsPermission = allPermissions.includes(expectedScope);

                // This is where we resolve dynamic permissions

                if (!containsPermission) {
                  _context.next = 29;
                  break;
                }

                userId = user._id;

                // Go through user dynamic permissions

                key = dynamicKeys.find(function (ele) {
                  if (ele === expectedScope) return ele;
                });
                modelSlice = key.slice(0, key.indexOf(":"));
                modelName = modelSlice[0] + modelSlice.slice(1);
                Model = resources.find(function (obj) {
                  return Object.keys(obj)[0] === modelName;
                });
                // make db call

                _context.next = 20;
                return Model[modelName].findById(resourceId);

              case 20:
                result = _context.sent;

                if (!result) {
                  _context.next = 25;
                  break;
                }

                return _context.abrupt("return", result);

              case 25:
                console.log("error: ", result);
                return _context.abrupt("return", new Error("Wrong resource was queried please contact technical support."));

              case 27:
                _context.next = 30;
                break;

              case 29:
                return _context.abrupt("return", new Error("You do not have the right privileges for this resource."));

              case 30:
                _context.next = 35;
                break;

              case 32:
                _context.prev = 32;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", _context.t0);

              case 35:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[0, 32]]);
      }));

      return function (_x, _x2, _x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(hasScopeDirective, [{
    key: "visitFieldDefinition",
    value: function visitFieldDefinition(field) {
      var _this3 = this;

      var expectedScope = this.args.scope;
      var _field$resolve = field.resolve,
          resolve = _field$resolve === undefined ? _graphql.defaultFieldResolver : _field$resolve;


      field.resolve = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          var resourceId, token, user, resource;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  resourceId = args[1].resourceId;

                  console.log("RESOURCE ID: ", resourceId);
                  token = args[2].req.headers.authorization;

                  if (!(token === "null")) {
                    _context2.next = 5;
                    break;
                  }

                  return _context2.abrupt("return", new Error("You need to be registered to view this resource."));

                case 5:
                  _context2.prev = 5;
                  _context2.next = 8;
                  return (0, _resolverFunctions.userByToken)(token, function (err, res) {
                    if (err) return err;
                    return res;
                  });

                case 8:
                  user = _context2.sent;

                  if (!(user.name === "JsonWebTokenError")) {
                    _context2.next = 11;
                    break;
                  }

                  throw new Error("Please be aware.  Due to suspicious activities, we are monitoring actions from your ip now.");

                case 11:
                  _context2.next = 13;
                  return _this3.hasPermission(_rolesSchema2.default, user, resourceId, expectedScope);

                case 13:
                  resource = _context2.sent;


                  console.log("resource: ", resource);

                  if (!(resource instanceof Error)) {
                    _context2.next = 17;
                    break;
                  }

                  return _context2.abrupt("return", resource);

                case 17:

                  console.log("owner: ", resource.owner);
                  console.log("user: ", user._id);

                  if (!(JSON.stringify(resource.owner) === JSON.stringify(user._id))) {
                    _context2.next = 23;
                    break;
                  }

                  return _context2.abrupt("return", resolve.apply(_this3, args));

                case 23:
                  return _context2.abrupt("return", new Error("You are not the owner of this resource."));

                case 24:
                  _context2.next = 29;
                  break;

                case 26:
                  _context2.prev = 26;
                  _context2.t0 = _context2["catch"](5);
                  return _context2.abrupt("return", _context2.t0);

                case 29:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, _this3, [[5, 26]]);
        }));

        return function () {
          return _ref3.apply(this, arguments);
        };
      }();
    }
  }]);
  return hasScopeDirective;
}(_apolloServer.SchemaDirectiveVisitor);

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(hasScopeDirective, "hasScopeDirective", "src/directives/auth/auth-has-scope.js");
  reactHotLoader.register(resources, "resources", "src/directives/auth/auth-has-scope.js");
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

  reactHotLoader.register(hasScopeDirective, "hasScopeDirective", "src/directives/auth/auth-has-scope.js");
  reactHotLoader.register(resources, "resources", "src/directives/auth/auth-has-scope.js");
  leaveModule(module);
})();

;