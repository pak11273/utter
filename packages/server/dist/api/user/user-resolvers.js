"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userResolvers = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _lodash = require("lodash");

var yup = _interopRequireWildcard(require("yup"));

var _config = _interopRequireDefault(require("../../config"));

var _auth = require("../../auth");

var _errorMessages = require("../shared/error-messages.js");

var _createConfirmationEmailLink = require("../../utils/create-confirmation-email-link.js");

var _createForgotPasswordLink = require("../../utils/create-forgot-password-link.js");

var _constants = require("../../constants");

var _formatYupError = require("../../utils/format-yup-error.js");

var _mail = require("../../mail/mail");

var _userModel = _interopRequireDefault(require("./user-model.js"));

var _resolverFunctions = require("../shared/resolver-functions.js");

var _common = require("@utterzone/common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var contact =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_, args, _ref) {
    var redis, url, email;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            redis = _ref.redis, url = _ref.url;
            _context.next = 3;
            return (0, _mail.sendContactEmail)(args);

          case 3:
            email = _context.sent;
            return _context.abrupt("return", {
              success: email.accepted,
              errors: email.rejected
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function contact(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var changePassword =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_, args, _ref3) {
    var redis, url, token, arrayOfErrors, redisToken, redisKey, userId, user, hashedPassword, updatePromise, deleteKeyPromise;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            redis = _ref3.redis, url = _ref3.url;
            token = null;
            arrayOfErrors = [];
            redisToken = args.input.token;
            redisKey = "".concat(_constants.forgotPasswordPrefix).concat(redisToken);
            _context2.next = 7;
            return redis.get(redisKey);

          case 7:
            userId = _context2.sent;

            if (userId) {
              _context2.next = 12;
              break;
            }

            console.log("no user");
            arrayOfErrors.push({
              path: "password",
              message: _errorMessages.expiredKey
            });
            return _context2.abrupt("return", {
              token: null,
              error: arrayOfErrors
            });

          case 12:
            _context2.prev = 12;
            args.input["password confirmation"] = args.input.passwordConfirmation;
            _context2.next = 16;
            return _common.changePasswordSchema.validate(args.input, {
              abortEarly: false
            });

          case 16:
            _context2.next = 23;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](12);

            if (!_context2.t0) {
              _context2.next = 23;
              break;
            }

            arrayOfErrors = (0, _formatYupError.formatYupError)(_context2.t0);
            return _context2.abrupt("return", {
              error: arrayOfErrors
            });

          case 23:
            _context2.next = 25;
            return _userModel.default.findById(userId).exec();

          case 25:
            user = _context2.sent;
            hashedPassword = user.encryptPassword(args.input.password);
            updatePromise = _userModel.default.findByIdAndUpdate(userId, {
              $set: {
                forgotPasswordLocked: false,
                password: hashedPassword
              }
            });
            token = (0, _auth.signToken)(user._id);
            deleteKeyPromise = redis.del(redisKey);
            _context2.next = 32;
            return Promise.all([updatePromise, deleteKeyPromise]);

          case 32:
            return _context2.abrupt("return", {
              token: token,
              error: []
            });

          case 33:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[12, 18]]);
  }));

  return function changePassword(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var signup =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(_, args, _ref5, info) {
    var redis, url, token, arrayOfErrors, _args$input, username, email, password, foundDupeEmail, foundDupeUsername, error, newUser;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            redis = _ref5.redis, url = _ref5.url;
            args.input["password confirmation"] = args.input.passwordConfirmation;
            token = null;
            arrayOfErrors = [];
            _context4.prev = 4;
            _context4.next = 7;
            return _common.signupSchema.validate(args.input, {
              abortEarly: false
            });

          case 7:
            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](4);

            if (_context4.t0) {
              arrayOfErrors = (0, _formatYupError.formatYupError)(_context4.t0);
            }

          case 12:
            _args$input = args.input, username = _args$input.username, email = _args$input.email, password = _args$input.password;
            _context4.next = 15;
            return _userModel.default.findOne({
              email: email
            }).exec();

          case 15:
            foundDupeEmail = _context4.sent;
            _context4.next = 18;
            return _userModel.default.findOne({
              username: username
            }).exec();

          case 18:
            foundDupeUsername = _context4.sent;

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
            } // Valid with unique email


            if (!(foundDupeEmail === null && (0, _lodash.isEmpty)(arrayOfErrors))) {
              _context4.next = 24;
              break;
            }

            newUser = new _userModel.default(args.input);
            return _context4.abrupt("return", newUser.save().then(
            /*#__PURE__*/
            function () {
              var _ref7 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee3(result) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        token = (0, _auth.signToken)(newUser._id);
                        result.password = null;
                        _context3.t0 = _mail.sendConfirmEmail;
                        _context3.t1 = newUser.email;
                        _context3.next = 6;
                        return (0, _createConfirmationEmailLink.createEmailConfirmLink)(url, newUser._id, redis);

                      case 6:
                        _context3.t2 = _context3.sent;
                        (0, _context3.t0)(_context3.t1, _context3.t2);
                        return _context3.abrupt("return", {
                          token: token,
                          user: result,
                          error: arrayOfErrors
                        });

                      case 9:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x11) {
                return _ref7.apply(this, arguments);
              };
            }()).catch(function (err) {
              throw err;
            }));

          case 24:
            return _context4.abrupt("return", {
              error: arrayOfErrors
            });

          case 25:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[4, 9]]);
  }));

  return function signup(_x7, _x8, _x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

var login =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(parent, args, ctx, info) {
    var _args$input2, identifier, password, token, arrayOfErrors, username, email, criteria, user;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // decipher identifier
            _args$input2 = args.input, identifier = _args$input2.identifier, password = _args$input2.password;
            token = "";
            arrayOfErrors = [];
            criteria = identifier.indexOf("@") === -1 ? {
              username: identifier
            } : {
              email: identifier
            };

            if (!identifier || !password) {
              arrayOfErrors.push({
                path: "identifier",
                message: "username/email or password cannot be blank"
              });
            } // check if passwords match


            _context5.next = 7;
            return _userModel.default.findOne(criteria).exec();

          case 7:
            user = _context5.sent;

            if (user) {
              _context5.next = 12;
              break;
            }

            arrayOfErrors.push({
              path: "identifier",
              message: "invalid username or email"
            });
            _context5.next = 24;
            break;

          case 12:
            if (user.authenticate(password)) {
              _context5.next = 16;
              break;
            }

            // use authenticate() on user.doc, pass in the posted password, hash it and check
            arrayOfErrors.push({
              path: "password",
              message: "Invalid Password"
            });
            _context5.next = 24;
            break;

          case 16:
            if (!user.forgotPasswordLocked) {
              _context5.next = 20;
              break;
            }

            arrayOfErrors.push({
              path: "identifier",
              message: _errorMessages.passwordLocked
            });
            _context5.next = 24;
            break;

          case 20:
            if (!user) {
              _context5.next = 24;
              break;
            }

            _context5.next = 23;
            return (0, _auth.signToken)(user._id);

          case 23:
            token = _context5.sent;

          case 24:
            return _context5.abrupt("return", {
              token: token,
              user: user,
              error: arrayOfErrors
            });

          case 25:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function login(_x12, _x13, _x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();

var getUserByToken =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(_, args, ctx, info) {
    var token, result, _userId, user;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            token = args.token;

            if (!token) {
              _context6.next = 16;
              break;
            }

            _context6.next = 5;
            return _jsonwebtoken.default.verify(token, _config.default.env.JWT);

          case 5:
            result = _context6.sent;

            if (!result) {
              _context6.next = 14;
              break;
            }

            _userId = result._id;
            _context6.next = 10;
            return _userModel.default.findById(_userId).lean().exec();

          case 10:
            user = _context6.sent;
            return _context6.abrupt("return", user);

          case 14:
            return _context6.abrupt("return", {
              username: ""
            });

          case 15:
            return _context6.abrupt("return", result);

          case 16:
            _context6.next = 21;
            break;

          case 18:
            _context6.prev = 18;
            _context6.t0 = _context6["catch"](0);
            throw _context6.t0;

          case 21:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 18]]);
  }));

  return function getUserByToken(_x16, _x17, _x18, _x19) {
    return _ref9.apply(this, arguments);
  };
}();

var getUserById =
/*#__PURE__*/
function () {
  var _ref10 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(_, args, ctx, info) {
    var result;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _userModel.default.findById({
              _id: args._id
            });

          case 2:
            result = _context7.sent;
            return _context7.abrupt("return", result);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getUserById(_x20, _x21, _x22, _x23) {
    return _ref10.apply(this, arguments);
  };
}();

var getUserByUsername =
/*#__PURE__*/
function () {
  var _ref11 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(_, args, ctx, info) {
    var result;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _userModel.default.findOne({
              username: args.input
            });

          case 2:
            result = _context8.sent;
            return _context8.abrupt("return", result);

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getUserByUsername(_x24, _x25, _x26, _x27) {
    return _ref11.apply(this, arguments);
  };
}();

var forgotPassword =
/*#__PURE__*/
function () {
  var _ref14 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(_, _ref12, _ref13) {
    var email, redis, url, user, link;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            email = _ref12.email;
            redis = _ref13.redis, url = _ref13.url;
            _context9.next = 4;
            return _userModel.default.findOne({
              email: email
            });

          case 4:
            user = _context9.sent;
            _context9.t0 = _mail.sendForgotPasswordEmail;
            _context9.t1 = user.email;
            _context9.next = 9;
            return (0, _createForgotPasswordLink.createForgotPasswordLink)(url, user._id, redis);

          case 9:
            _context9.t2 = _context9.sent;
            _context9.next = 12;
            return (0, _context9.t0)(_context9.t1, _context9.t2);

          case 12:
            link = _context9.sent;
            return _context9.abrupt("return", true);

          case 14:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function forgotPassword(_x28, _x29, _x30) {
    return _ref14.apply(this, arguments);
  };
}();

var updateMe = function updateMe(_, _ref15, _ref16) {
  var input = _ref15.input;
  var user = _ref16.user;
  merge(user, input);
  return user.save();
};

var getSubscriptions =
/*#__PURE__*/
function () {
  var _ref18 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(_, args, _ref17) {
    var user, subscriptions;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            user = _ref17.user;
            _context10.prev = 1;
            _context10.next = 4;
            return _userModel.default.findById(userId);

          case 4:
            subscriptions = _context10.sent;
            return _context10.abrupt("return", _objectSpread({}, subscriptions._doc, {
              _id: subscriptions.id
            }));

          case 8:
            _context10.prev = 8;
            _context10.t0 = _context10["catch"](1);
            throw _context10.t0;

          case 11:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 8]]);
  }));

  return function getSubscriptions(_x31, _x32, _x33) {
    return _ref18.apply(this, arguments);
  };
}();

var userResolvers = {
  Query: {
    getSubscriptions: getSubscriptions,
    getUserById: getUserById,
    getUserByToken: getUserByToken,
    getUserByUsername: getUserByUsername,
    hello: function hello(_, _ref19) {
      var name = _ref19.name;
      return "Hello ".concat(name || "World");
    }
  },
  User: {
    contacts: function contacts(user) {
      console.log("friends"); // TODO: Query db for contacts

      return ["Tom", "Bob", "Harry"];
    }
  },
  Mutation: {
    changePassword: changePassword,
    contact: contact,
    forgotPassword: forgotPassword,
    signup: signup,
    login: login,
    updateMe: updateMe
  }
};
exports.userResolvers = userResolvers;