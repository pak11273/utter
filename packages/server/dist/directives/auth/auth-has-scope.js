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

var _zoneModel = require("../../api/zone/zone-model.js");

var _zoneModel2 = _interopRequireDefault(_zoneModel);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    }, _this.reducePermissions = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(rules, user, expectedScope) {
        var roles, hasDynamicPermissions, hasStaticPermissions, dynamicRules, combinedDynamicRules, dynamicKeys, combinedRules, allPermissions, containsPermission, userId, resourceId, passPermissionsArr;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                roles = user.roles;
                hasDynamicPermissions = false;
                hasStaticPermissions = false;

                // Users without roles get "guest" applied

                if (!roles) roles = ["guest"];

                // Flatten all dynamic rules
                dynamicRules = [];

                roles.map(function (role) {
                  if (rules[role].dynamic) {
                    dynamicRules.push(rules[role].dynamic);
                  }
                });

                combinedDynamicRules = (0, _lodash.uniq)((0, _lodash.flatten)(dynamicRules));

                // Array of Keys for combinedDynamicRules

                dynamicKeys = combinedDynamicRules.map(function (obj) {
                  return Object.keys(obj)[0];
                });

                // Static rules setup,flattened all user's static permissions

                combinedRules = [];

                roles.map(function (role) {
                  combinedRules.push(rules[role].static);
                });
                combinedRules.push(dynamicKeys); //append dynamic keys

                allPermissions = (0, _lodash.uniq)((0, _lodash.flatten)(combinedRules));

                // See if user's roles has the permissions from expectedScope

                containsPermission = _this.arrayContainsAnotherArray(expectedScope, allPermissions);

                if (!containsPermission) {
                  _context.next = 25;
                  break;
                }

                userId = user._id;
                resourceId = "Test";
                passPermissionsArr = [];

                console.log("userId: ", userId);

                _context.next = 20;
                return expectedScope.map(function (scope) {
                  if (dynamicKeys.indexOf(scope) > -1) {
                    roles.map(function (role) {
                      rules[role].dynamic.map(function (obj) {
                        var objName = Object.getOwnPropertyNames(obj)[0];
                        var modelSlice = objName.slice(0, objName.indexOf(":"));
                        var modelName = modelSlice[0].toUpperCase() + modelSlice.slice(1);

                        if (obj.hasOwnProperty(scope)) {
                          // make db call then
                          /* const resourceId = null */
                          _courseModel2.default.findOne({ courseAuthor: userId }, function (err, doc) {
                            if (doc) {
                              var ownerId = doc.courseAuthor;
                              console.log("ownerId: ", ownerId);
                              passPermissionsArr.push(obj[scope](userId, ownerId));
                              console.log("array: ", passPermissionsArr);
                            }
                          });
                        }
                      });
                    });
                  }
                });

              case 20:

                console.log("arry: ", passPermissionsArr);

                if (!passPermissionsArr.includes(false)) {
                  _context.next = 23;
                  break;
                }

                return _context.abrupt("return", false);

              case 23:
                if (!passPermissionsArr.includes(true)) {
                  _context.next = 25;
                  break;
                }

                return _context.abrupt("return", true);

              case 25:
                if (!containsPermission) {
                  _context.next = 29;
                  break;
                }

                return _context.abrupt("return", true);

              case 29:
                return _context.abrupt("return", false);

              case 30:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(hasScopeDirective, [{
    key: "visitFieldDefinition",
    value: function visitFieldDefinition(field) {
      var _this3 = this;

      var expectedScope = this.args.scopes;
      var _field$resolve = field.resolve,
          resolve = _field$resolve === undefined ? _graphql.defaultFieldResolver : _field$resolve;


      field.resolve = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          var token, user, thing;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  token = args[2].req.headers.authorization;

                  if (!(token === "null")) {
                    _context2.next = 3;
                    break;
                  }

                  return _context2.abrupt("return", new Error("You need to be registered to view this resource."));

                case 3:
                  _context2.prev = 3;
                  _context2.next = 6;
                  return (0, _resolverFunctions.userByToken)(token, function (err, res) {
                    if (err) return err;
                    return res;
                  });

                case 6:
                  user = _context2.sent;

                  if (!(user.name === "JsonWebTokenError")) {
                    _context2.next = 9;
                    break;
                  }

                  throw new Error("Please be aware.  Due to suspicious activities, we are monitoring actions from your ip now.");

                case 9:
                  thing = _this3.reducePermissions(_rolesSchema2.default, user, expectedScope);

                  /*   /1*  if (!requiredScope) { *1/ */

                  return _context2.abrupt("return", resolve.apply(_this3, args));

                case 13:
                  _context2.prev = 13;
                  _context2.t0 = _context2["catch"](3);
                  return _context2.abrupt("return", _context2.t0);

                case 16:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, _this3, [[3, 13]]);
        }));

        return function () {
          return _ref3.apply(this, arguments);
        };
      }();
    }
  }]);
  return hasScopeDirective;
}(_apolloServer.SchemaDirectiveVisitor);

// resources
/* import { AuthorizationError } from "./errors"; */