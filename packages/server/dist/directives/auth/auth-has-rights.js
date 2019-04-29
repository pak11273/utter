"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasRightsDirective = void 0;

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

var hasRightsDirective =
/*#__PURE__*/
function (_SchemaDirectiveVisit) {
  (0, _inherits2.default)(hasRightsDirective, _SchemaDirectiveVisit);

  function hasRightsDirective() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, hasRightsDirective);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(hasRightsDirective)).call.apply(_getPrototypeOf2, [this].concat(args)));
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
      _regenerator.default.mark(function _callee(rules, user, resourceId, expectedRight) {
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

                allPermissions = (0, _lodash.uniq)((0, _lodash.flatten)(combinedRules)); // See if user's roles has the permissions from expectedRight

                containsPermission = allPermissions.includes(expectedRight); // This is where we resolve dynamic permissions

                if (!containsPermission) {
                  _context.next = 29;
                  break;
                }

                userId = user._id; // Go through user dynamic permissions

                key = dynamicKeys.find(function (ele) {
                  if (ele === expectedRight) return ele;
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

  (0, _createClass2.default)(hasRightsDirective, [{
    key: "visitFieldDefinition",
    value: function visitFieldDefinition(field) {
      var _this2 = this;

      var expectedRight = this.args.right;
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
                return _this2.hasPermission(_rolesSchema.default, user, resourceId, expectedRight);

              case 13:
                resource = _context2.sent;

                if (!(resource instanceof Error)) {
                  _context2.next = 16;
                  break;
                }

                return _context2.abrupt("return", resource);

              case 16:
                if (!(JSON.stringify(resource.owner) === JSON.stringify(user._id))) {
                  _context2.next = 20;
                  break;
                }

                return _context2.abrupt("return", resolve.apply(_this2, args));

              case 20:
                return _context2.abrupt("return", new Error("You are not the owner of this resource."));

              case 21:
                _context2.next = 26;
                break;

              case 23:
                _context2.prev = 23;
                _context2.t0 = _context2["catch"](5);
                return _context2.abrupt("return", _context2.t0);

              case 26:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[5, 23]]);
      }));
    }
  }]);
  return hasRightsDirective;
}(_apolloServer.SchemaDirectiveVisitor);

exports.hasRightsDirective = hasRightsDirective;