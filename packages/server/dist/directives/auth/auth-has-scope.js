"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasScopeDirective = void 0;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  _inherits(hasScopeDirective, _SchemaDirectiveVisit);

  function hasScopeDirective() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, hasScopeDirective);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(hasScopeDirective)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "arrayContainsAnotherArray", function (needle, haystack) {
      for (var i = 0; i < needle.length; i++) {
        if (haystack.indexOf(needle[i]) === -1) return false;
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "hasPermission",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(rules, user, resourceId, expectedScope) {
        var roles, dynamicRules, combinedDynamicRules, dynamicKeys, combinedRules, allPermissions, containsPermission, userId, key, modelSlice, modelName, Model, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
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

  _createClass(hasScopeDirective, [{
    key: "visitFieldDefinition",
    value: function visitFieldDefinition(field) {
      var _this2 = this;

      var expectedScope = this.args.scope;
      var _field$resolve = field.resolve,
          resolve = _field$resolve === void 0 ? _graphql.defaultFieldResolver : _field$resolve;
      field.resolve =
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _len2,
            args,
            _key2,
            resourceId,
            token,
            user,
            resource,
            _args2 = arguments;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
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