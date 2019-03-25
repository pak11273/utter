"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasScopeDirective = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var jwt = _interopRequireWildcard(require("jsonwebtoken"));

var _lodash = require("lodash");

var _apolloServer = require("apollo-server");

var _resolverFunctions = require("../../api/shared/resolver-functions.js");

var _graphql = require("graphql");

var _rolesSchema = _interopRequireDefault(require("@utterzone/common/dist/auth/roles-schema"));

var _userModel = _interopRequireDefault(require("../../api/user/user-model.js"));

var _courseModel = _interopRequireDefault(require("../../api/course/course-model.js"));

var _levelModel = _interopRequireDefault(require("../../api/level/level-model.js"));

var _termModel = _interopRequireDefault(require("../../api/term/term-model.js"));

var _testModel = _interopRequireDefault(require("../../api/test/test-model.js"));

var _zoneModel = _interopRequireDefault(require("../../api/zone/zone-model.js"));

/* import { AuthorizationError } from "./errors"; */
// resources
// register resources
var resources = [{
  user: _userModel.default
}, {
  course: _courseModel.default
}, {
  level: _levelModel.default
}, {
  term: _termModel.default
}, {
  test: _testModel.default
}, {
  zone: _zoneModel.default
}];

var hasScopeDirective =
/*#__PURE__*/
function (_SchemaDirectiveVisit) {
  (0, _inherits2.default)(hasScopeDirective, _SchemaDirectiveVisit);

  function hasScopeDirective() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, hasScopeDirective);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(hasScopeDirective)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "arrayContainsAnotherArray", function (needle, haystack) {
      for (var i = 0; i < needle.length; i++) {
        if (haystack.indexOf(needle[i]) === -1) return false;
      }

      return true;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "hasPermission",
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(rules, user, resourceId, expectedScope) {
        var roles, dynamicRules, combinedDynamicRules, dynamicKeys, combinedRules, allPermissions, containsPermission, userId, key, modelSlice, modelName, Model, result;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                roles = user.roles; // Users without roles get "guest" applied

                if (!roles) roles = ["guest"]; // Flatten all dynamic rules of the user

                dynamicRules = [];
                roles.map(function (role) {
                  if (rules[role].dynamic) {
                    dynamicRules.push(rules[role].dynamic);
                  }
                });
                combinedDynamicRules = (0, _lodash.flatten)(dynamicRules); // Array of Keys for combinedDynamicRules

                dynamicKeys = (0, _lodash.uniq)(combinedDynamicRules.map(function (obj) {
                  return Object.keys(obj)[0];
                })); // Static rules setup,flattened all user's static permissions

                combinedRules = [];
                roles.map(function (role) {
                  combinedRules.push(rules[role].static);
                });
                combinedRules.push(dynamicKeys); //append dynamic keys

                allPermissions = (0, _lodash.uniq)((0, _lodash.flatten)(combinedRules)); // See if user's roles has the permissions from expectedScope

                containsPermission = allPermissions.includes(expectedScope); // This is where we resolve dynamic permissions

                if (!containsPermission) {
                  _context.next = 29;
                  break;
                }

                userId = user._id; // Go through user dynamic permissions

                key = dynamicKeys.find(function (ele) {
                  if (ele === expectedScope) return ele;
                });
                modelSlice = key.slice(0, key.indexOf(":"));
                modelName = modelSlice[0] + modelSlice.slice(1);
                Model = resources.find(function (obj) {
                  return Object.keys(obj)[0] === modelName;
                }); // make db call

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
        }, _callee, null, [[0, 32]]);
      }));

      return function (_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      };
    }());
    return _this;
  }

  (0, _createClass2.default)(hasScopeDirective, [{
    key: "visitFieldDefinition",
    value: function visitFieldDefinition(field) {
      var _this2 = this;

      var expectedScope = this.args.scope;
      var _field$resolve = field.resolve,
          resolve = _field$resolve === void 0 ? _graphql.defaultFieldResolver : _field$resolve;
      field.resolve =
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var _len2,
            args,
            _key2,
            resourceId,
            token,
            user,
            resource,
            _args2 = arguments;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                for (_len2 = _args2.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                  args[_key2] = _args2[_key2];
                }

                resourceId = args[1].resourceId;
                console.log("RESOURCE ID: ", resourceId);
                token = args[2].req.headers.authorization;

                if (!(token === "null")) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", new Error("You need to be registered to view this resource."));

              case 6:
                _context2.prev = 6;
                _context2.next = 9;
                return (0, _resolverFunctions.userByToken)(token, function (err, res) {
                  if (err) return err;
                  return res;
                });

              case 9:
                user = _context2.sent;

                if (!(user.name === "JsonWebTokenError")) {
                  _context2.next = 12;
                  break;
                }

                throw new Error("Please be aware.  Due to suspicious activities, we are monitoring actions from your ip now.");

              case 12:
                _context2.next = 14;
                return _this2.hasPermission(_rolesSchema.default, user, resourceId, expectedScope);

              case 14:
                resource = _context2.sent;
                console.log("resource: ", resource);

                if (!(resource instanceof Error)) {
                  _context2.next = 18;
                  break;
                }

                return _context2.abrupt("return", resource);

              case 18:
                console.log("owner: ", resource.owner);
                console.log("user: ", user._id);

                if (!(JSON.stringify(resource.owner) === JSON.stringify(user._id))) {
                  _context2.next = 24;
                  break;
                }

                return _context2.abrupt("return", resolve.apply(_this2, args));

              case 24:
                return _context2.abrupt("return", new Error("You are not the owner of this resource."));

              case 25:
                _context2.next = 30;
                break;

              case 27:
                _context2.prev = 27;
                _context2.t0 = _context2["catch"](6);
                return _context2.abrupt("return", _context2.t0);

              case 30:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[6, 27]]);
      }));
    }
  }]);
  return hasScopeDirective;
}(_apolloServer.SchemaDirectiveVisitor);

exports.hasScopeDirective = hasScopeDirective;