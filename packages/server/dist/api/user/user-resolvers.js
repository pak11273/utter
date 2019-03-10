"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userResolvers = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _lodash = require("lodash");

var _yup = require("yup");

var yup = _interopRequireWildcard(_yup);

var _config = require("../../config");

var _config2 = _interopRequireDefault(_config);

var _auth = require("../../auth");

var _errorMessages = require("../shared/error-messages.js");

var _createConfirmationEmailLink = require("../../utils/create-confirmation-email-link.js");

var _createForgotPasswordLink = require("../../utils/create-forgot-password-link.js");

var _constants = require("../../constants");

var _formatYupError = require("../../utils/format-yup-error.js");

var _mail = require("../../mail/mail");

var _userModel = require("./user-model.js");

var _userModel2 = _interopRequireDefault(_userModel);

var _resolverFunctions = require("../shared/resolver-functions.js");

var _common = require("@utterzone/common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var changePassword = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_, args, _ref2) {
    var redis = _ref2.redis,
        url = _ref2.url;
    var token, arrayOfErrors, redisToken, redisKey, userId, user, hashedPassword, updatePromise, deleteKeyPromise;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = null;
            arrayOfErrors = [];
            redisToken = args.input.token;
            redisKey = "" + _constants.forgotPasswordPrefix + redisToken;
            _context.next = 6;
            return redis.get(redisKey);

          case 6:
            userId = _context.sent;

            if (userId) {
              _context.next = 11;
              break;
            }

            console.log("no user");
            arrayOfErrors.push({
              path: "password",
              message: _errorMessages.expiredKey
            });
            return _context.abrupt("return", {
              token: null,
              error: arrayOfErrors
            });

          case 11:
            _context.prev = 11;

            args.input["password confirmation"] = args.input.passwordConfirmation;
            _context.next = 15;
            return _common.changePasswordSchema.validate(args.input, {
              abortEarly: false
            });

          case 15:
            _context.next = 22;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](11);

            if (!_context.t0) {
              _context.next = 22;
              break;
            }

            arrayOfErrors = (0, _formatYupError.formatYupError)(_context.t0);

            return _context.abrupt("return", {
              error: arrayOfErrors
            });

          case 22:
            _context.next = 24;
            return _userModel2.default.findById(userId).exec();

          case 24:
            user = _context.sent;
            hashedPassword = user.encryptPassword(args.input.password);
            updatePromise = _userModel2.default.findByIdAndUpdate(userId, {
              $set: { forgotPasswordLocked: false, password: hashedPassword }
            });

            token = (0, _auth.signToken)(user._id);

            deleteKeyPromise = redis.del(redisKey);
            _context.next = 31;
            return Promise.all([updatePromise, deleteKeyPromise]);

          case 31:
            return _context.abrupt("return", {
              token: token,
              error: []
            });

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[11, 17]]);
  }));

  return function changePassword(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(); /* eslint-enable no-unused-vars */


var signup = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_, args, _ref4, info) {
    var redis = _ref4.redis,
        url = _ref4.url;

    var token, arrayOfErrors, _args$input, username, email, password, foundDupeEmail, foundDupeUsername, error, newUser;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            args.input["password confirmation"] = args.input.passwordConfirmation;

            token = null;
            arrayOfErrors = [];
            _context3.prev = 3;
            _context3.next = 6;
            return _common.signupSchema.validate(args.input, { abortEarly: false });

          case 6:
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](3);

            if (_context3.t0) {
              arrayOfErrors = (0, _formatYupError.formatYupError)(_context3.t0);
            }

          case 11:
            _args$input = args.input, username = _args$input.username, email = _args$input.email, password = _args$input.password;
            _context3.next = 14;
            return _userModel2.default.findOne({ email: email }).exec();

          case 14:
            foundDupeEmail = _context3.sent;
            _context3.next = 17;
            return _userModel2.default.findOne({ username: username }).exec();

          case 17:
            foundDupeUsername = _context3.sent;


            if (foundDupeUsername !== null) {
              error = {
                path: "username",
                message: _errorMessages.duplicateUsername
              };

              arrayOfErrors.push(error);
            }

            if (foundDupeEmail !== null) {
              error = {
                path: "email",
                message: _errorMessages.duplicateEmail
              };

              arrayOfErrors.push(error);
            }

            // Valid with unique email

            if (!(foundDupeEmail === null && (0, _lodash.isEmpty)(arrayOfErrors))) {
              _context3.next = 23;
              break;
            }

            newUser = new _userModel2.default(args.input);
            return _context3.abrupt("return", newUser.save().then(function () {
              var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(result) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        token = (0, _auth.signToken)(newUser._id);
                        result.password = null;

                        _context2.t0 = _mail.sendConfirmEmail;
                        _context2.t1 = newUser.email;
                        _context2.next = 6;
                        return (0, _createConfirmationEmailLink.createEmailConfirmLink)(url, newUser._id, redis);

                      case 6:
                        _context2.t2 = _context2.sent;
                        (0, _context2.t0)(_context2.t1, _context2.t2);
                        return _context2.abrupt("return", {
                          token: token,
                          user: result,
                          error: arrayOfErrors
                        });

                      case 9:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x8) {
                return _ref5.apply(this, arguments);
              };
            }()).catch(function (err) {
              throw err;
            }));

          case 23:
            return _context3.abrupt("return", {
              error: arrayOfErrors
            });

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[3, 8]]);
  }));

  return function signup(_x4, _x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var login = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(parent, args, ctx, info) {
    var _args$input2, identifier, password, token, arrayOfErrors, username, email, criteria, user;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // decipher identifier
            _args$input2 = args.input, identifier = _args$input2.identifier, password = _args$input2.password;
            token = "";
            arrayOfErrors = [];
            username = void 0, email = void 0;
            criteria = identifier.indexOf("@") === -1 ? { username: identifier } : { email: identifier };

            if (!identifier || !password) {
              arrayOfErrors.push({
                path: "identifier",
                message: "username/email or password cannot be blank"
              });
            }
            // check if passwords match
            _context4.next = 8;
            return _userModel2.default.findOne(criteria).exec();

          case 8:
            user = _context4.sent;

            if (user) {
              _context4.next = 13;
              break;
            }

            arrayOfErrors.push({
              path: "identifier",
              message: "invalid username or email"
            });
            _context4.next = 25;
            break;

          case 13:
            if (user.authenticate(password)) {
              _context4.next = 17;
              break;
            }

            // use authenticate() on user.doc, pass in the posted password, hash it and check
            arrayOfErrors.push({ path: "password", message: "Invalid Password" });
            _context4.next = 25;
            break;

          case 17:
            if (!user.forgotPasswordLocked) {
              _context4.next = 21;
              break;
            }

            arrayOfErrors.push({
              path: "identifier",
              message: _errorMessages.passwordLocked
            });
            _context4.next = 25;
            break;

          case 21:
            if (!user) {
              _context4.next = 25;
              break;
            }

            _context4.next = 24;
            return (0, _auth.signToken)(user._id);

          case 24:
            token = _context4.sent;

          case 25:
            return _context4.abrupt("return", {
              token: token,
              user: user,
              error: arrayOfErrors
            });

          case 26:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function login(_x9, _x10, _x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var getUserByToken = function getUserByToken(_, args, ctx, info) {
  var token = args.token;
  /* var token = ctx.req.headers.authorization || null */
  if (token) {
    var result = _jsonwebtoken2.default.verify(token, _config2.default.env.JWT, function (err, decoded) {
      if (err) console.log("err: ", err);
      if (decoded) {
        var userID = decoded._id;
        var user = _userModel2.default.findOne({ _id: userID });
        return user;
      } else {
        return { username: "" };
      }
    });
    return result;
  }
};

var getUserById = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_, args, ctx, info) {
    var result;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _userModel2.default.findById({ _id: args._id });

          case 2:
            result = _context5.sent;
            return _context5.abrupt("return", result);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function getUserById(_x13, _x14, _x15, _x16) {
    return _ref7.apply(this, arguments);
  };
}();

var getUserByUsername = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(_, args, ctx, info) {
    var result;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _userModel2.default.findOne({ username: args.input });

          case 2:
            result = _context6.sent;
            return _context6.abrupt("return", result);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function getUserByUsername(_x17, _x18, _x19, _x20) {
    return _ref8.apply(this, arguments);
  };
}();

var forgotPassword = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(_, _ref10, _ref11) {
    var email = _ref10.email;
    var redis = _ref11.redis,
        url = _ref11.url;
    var user, link;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _userModel2.default.findOne({ email: email });

          case 2:
            user = _context7.sent;
            _context7.t0 = _mail.sendForgotPasswordEmail;
            _context7.t1 = user.email;
            _context7.next = 7;
            return (0, _createForgotPasswordLink.createForgotPasswordLink)(url, user._id, redis);

          case 7:
            _context7.t2 = _context7.sent;
            _context7.next = 10;
            return (0, _context7.t0)(_context7.t1, _context7.t2);

          case 10:
            link = _context7.sent;
            return _context7.abrupt("return", true);

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function forgotPassword(_x21, _x22, _x23) {
    return _ref9.apply(this, arguments);
  };
}();

var updateMe = function updateMe(_, _ref12, _ref13) {
  var input = _ref12.input;
  var user = _ref13.user;

  merge(user, input);
  return user.save();
};

var getSubscriptions = function () {
  var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(_, args, _ref15) {
    var user = _ref15.user;
    var subscriptions;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _userModel2.default.findById(userId);

          case 3:
            subscriptions = _context8.sent;
            return _context8.abrupt("return", (0, _extends3.default)({}, subscriptions._doc, { _id: subscriptions.id }));

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            throw _context8.t0;

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[0, 7]]);
  }));

  return function getSubscriptions(_x24, _x25, _x26) {
    return _ref14.apply(this, arguments);
  };
}();

var userResolvers = exports.userResolvers = {
  Query: {
    getSubscriptions: getSubscriptions,
    getUserById: getUserById,
    getUserByToken: getUserByToken,
    getUserByUsername: getUserByUsername,
    hello: function hello(_, _ref16) {
      var name = _ref16.name;
      return "Hello " + (name || "World");
    }
  },

  User: {
    contacts: function contacts(user) {
      console.log("friends");
      // TODO: Query db for contacts
      return ["Tom", "Bob", "Harry"];
    }
  },

  Mutation: {
    changePassword: changePassword,
    forgotPassword: forgotPassword,
    signup: signup,
    login: login,
    updateMe: updateMe
  }
};
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(userResolvers, "userResolvers", "src/api/user/user-resolvers.js");
  reactHotLoader.register(changePassword, "changePassword", "src/api/user/user-resolvers.js");
  reactHotLoader.register(signup, "signup", "src/api/user/user-resolvers.js");
  reactHotLoader.register(login, "login", "src/api/user/user-resolvers.js");
  reactHotLoader.register(getUserByToken, "getUserByToken", "src/api/user/user-resolvers.js");
  reactHotLoader.register(getUserById, "getUserById", "src/api/user/user-resolvers.js");
  reactHotLoader.register(getUserByUsername, "getUserByUsername", "src/api/user/user-resolvers.js");
  reactHotLoader.register(forgotPassword, "forgotPassword", "src/api/user/user-resolvers.js");
  reactHotLoader.register(updateMe, "updateMe", "src/api/user/user-resolvers.js");
  reactHotLoader.register(getSubscriptions, "getSubscriptions", "src/api/user/user-resolvers.js");
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

  reactHotLoader.register(userResolvers, "userResolvers", "src/api/user/user-resolvers.js");
  reactHotLoader.register(changePassword, "changePassword", "src/api/user/user-resolvers.js");
  reactHotLoader.register(signup, "signup", "src/api/user/user-resolvers.js");
  reactHotLoader.register(login, "login", "src/api/user/user-resolvers.js");
  reactHotLoader.register(getUserByToken, "getUserByToken", "src/api/user/user-resolvers.js");
  reactHotLoader.register(getUserById, "getUserById", "src/api/user/user-resolvers.js");
  reactHotLoader.register(getUserByUsername, "getUserByUsername", "src/api/user/user-resolvers.js");
  reactHotLoader.register(forgotPassword, "forgotPassword", "src/api/user/user-resolvers.js");
  reactHotLoader.register(updateMe, "updateMe", "src/api/user/user-resolvers.js");
  reactHotLoader.register(getSubscriptions, "getSubscriptions", "src/api/user/user-resolvers.js");
  leaveModule(module);
})();

;