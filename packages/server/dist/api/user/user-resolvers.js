"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userResolvers = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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

/* eslint-enable no-unused-vars */
var confirmEmail =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_, args, _ref) {
    var redis, url, redisToken, redisKey, userId;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            redis = _ref.redis, url = _ref.url;
            redisToken = args.input.token;
            redisKey = "".concat(_constants.confirmEmailPrefix).concat(redisToken);
            _context.next = 5;
            return redis.get(redisKey);

          case 5:
            userId = _context.sent;

            if (userId) {
              _context.next = 10;
              break;
            }

            console.log("no user");
            arrayOfErrors.push({
              path: "password",
              message: _errorMessages.expiredKeyError
            });
            return _context.abrupt("return", {
              token: null,
              error: arrayOfErrors
            });

          case 10:
            console.log("args: ", args); // change confirm to true

            /* User.updateOne(). */

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function confirmEmail(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var contact =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(_, args, _ref3) {
    var redis, url, email;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            redis = _ref3.redis, url = _ref3.url;
            _context2.next = 3;
            return (0, _mail.sendContactEmail)(args);

          case 3:
            email = _context2.sent;
            return _context2.abrupt("return", {
              success: email.accepted,
              errors: email.rejected
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function contact(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var changePassword =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(_, args, _ref5) {
    var redis, url, token, arrayOfErrors, redisToken, redisKey, userId, user, hashedPassword, updatePromise, deleteKeyPromise;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            redis = _ref5.redis, url = _ref5.url;
            token = null;
            arrayOfErrors = [];
            redisToken = args.input.token;
            redisKey = "".concat(_constants.forgotPasswordPrefix).concat(redisToken);
            _context3.next = 7;
            return redis.get(redisKey);

          case 7:
            userId = _context3.sent;

            if (userId) {
              _context3.next = 12;
              break;
            }

            console.log("no user");
            arrayOfErrors.push({
              path: "password",
              message: _errorMessages.expiredKeyError
            });
            return _context3.abrupt("return", {
              token: null,
              error: arrayOfErrors
            });

          case 12:
            _context3.prev = 12;
            args.input["password confirmation"] = args.input.passwordConfirmation;
            _context3.next = 16;
            return _common.changePasswordSchema.validate(args.input, {
              abortEarly: false
            });

          case 16:
            _context3.next = 23;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](12);

            if (!_context3.t0) {
              _context3.next = 23;
              break;
            }

            arrayOfErrors = (0, _formatYupError.formatYupError)(_context3.t0);
            return _context3.abrupt("return", {
              error: arrayOfErrors
            });

          case 23:
            _context3.next = 25;
            return _userModel.default.findById(userId).exec();

          case 25:
            user = _context3.sent;
            hashedPassword = user.encryptPassword(args.input.password);
            updatePromise = _userModel.default.findByIdAndUpdate(userId, {
              $set: {
                forgotPasswordLocked: false,
                password: hashedPassword
              }
            });
            token = (0, _auth.signToken)(user._id);
            deleteKeyPromise = redis.del(redisKey);
            _context3.next = 32;
            return Promise.all([updatePromise, deleteKeyPromise]);

          case 32:
            return _context3.abrupt("return", {
              token: token,
              error: []
            });

          case 33:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[12, 18]]);
  }));

  return function changePassword(_x7, _x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();

var signup =
/*#__PURE__*/
function () {
  var _ref8 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(_, args, _ref7, info) {
    var redis, url, token, arrayOfErrors, _args$input, username, email, password, foundDupeEmail, foundDupeUsername, error, newUser;

    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            redis = _ref7.redis, url = _ref7.url;
            args.input["password confirmation"] = args.input.passwordConfirmation;
            token = null;
            arrayOfErrors = [];
            _context5.prev = 4;
            _context5.next = 7;
            return _common.signupSchema.validate(args.input, {
              abortEarly: false
            });

          case 7:
            _context5.next = 12;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](4);

            if (_context5.t0) {
              arrayOfErrors = (0, _formatYupError.formatYupError)(_context5.t0);
            }

          case 12:
            _args$input = args.input, username = _args$input.username, email = _args$input.email, password = _args$input.password;
            _context5.next = 15;
            return _userModel.default.findOne({
              email: email
            }).exec();

          case 15:
            foundDupeEmail = _context5.sent;
            _context5.next = 18;
            return _userModel.default.findOne({
              username: username
            }).exec();

          case 18:
            foundDupeUsername = _context5.sent;

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
              _context5.next = 24;
              break;
            }

            newUser = new _userModel.default(args.input);
            return _context5.abrupt("return", newUser.save().then(
            /*#__PURE__*/
            function () {
              var _ref9 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee4(result) {
                return _regenerator.default.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        token = (0, _auth.signToken)(newUser._id);
                        result.password = null;
                        _context4.t0 = _mail.sendConfirmEmail;
                        _context4.t1 = newUser.email;
                        _context4.next = 6;
                        return (0, _createConfirmationEmailLink.createEmailConfirmLink)(url, newUser._id, redis);

                      case 6:
                        _context4.t2 = _context4.sent;
                        (0, _context4.t0)(_context4.t1, _context4.t2);
                        return _context4.abrupt("return", {
                          token: token,
                          user: result,
                          error: arrayOfErrors
                        });

                      case 9:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x14) {
                return _ref9.apply(this, arguments);
              };
            }()).catch(function (err) {
              throw err;
            }));

          case 24:
            return _context5.abrupt("return", {
              error: arrayOfErrors
            });

          case 25:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[4, 9]]);
  }));

  return function signup(_x10, _x11, _x12, _x13) {
    return _ref8.apply(this, arguments);
  };
}();

var login =
/*#__PURE__*/
function () {
  var _ref10 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee6(parent, args, ctx, info) {
    var _args$input2, identifier, password, token, arrayOfErrors, username, email, criteria, user;

    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
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


            _context6.next = 7;
            return _userModel.default.findOne(criteria).populate("subscriptions").exec();

          case 7:
            user = _context6.sent;

            /* const subscriptions = user.subscriptions.map(course => { */

            /* return */

            /*     levels: course.find() */

            /*   } */

            /* }) */
            console.log("user: ", user);

            if (user) {
              _context6.next = 13;
              break;
            }

            arrayOfErrors.push({
              path: "identifier",
              message: "invalid username or email"
            });
            _context6.next = 25;
            break;

          case 13:
            if (user.authenticate(password)) {
              _context6.next = 17;
              break;
            }

            // use authenticate() on user.doc, pass in the posted password, hash it and check
            arrayOfErrors.push({
              path: "password",
              message: "Invalid Password"
            });
            _context6.next = 25;
            break;

          case 17:
            if (!user.forgotPasswordLocked) {
              _context6.next = 21;
              break;
            }

            arrayOfErrors.push({
              path: "identifier",
              message: _errorMessages.passwordLocked
            });
            _context6.next = 25;
            break;

          case 21:
            if (!user) {
              _context6.next = 25;
              break;
            }

            _context6.next = 24;
            return (0, _auth.signToken)(user._id);

          case 24:
            token = _context6.sent;

          case 25:
            console.log("user: ", user);
            return _context6.abrupt("return", {
              token: token,
              user: user,
              error: arrayOfErrors
            });

          case 27:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function login(_x15, _x16, _x17, _x18) {
    return _ref10.apply(this, arguments);
  };
}();

var getUserByToken =
/*#__PURE__*/
function () {
  var _ref11 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee7(_, args, ctx, info) {
    var token, result, _userId, user;

    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            console.log("args: ", args);
            _context7.prev = 1;
            token = args.token;

            if (!token) {
              _context7.next = 17;
              break;
            }

            _context7.next = 6;
            return _jsonwebtoken.default.verify(token, _config.default.env.JWT);

          case 6:
            result = _context7.sent;

            if (!result) {
              _context7.next = 15;
              break;
            }

            _userId = result._id;
            _context7.next = 11;
            return _userModel.default.findById(_userId).populate("subscriptions").lean();

          case 11:
            user = _context7.sent;
            return _context7.abrupt("return", user);

          case 15:
            return _context7.abrupt("return", {
              username: ""
            });

          case 16:
            return _context7.abrupt("return", result);

          case 17:
            _context7.next = 22;
            break;

          case 19:
            _context7.prev = 19;
            _context7.t0 = _context7["catch"](1);
            throw _context7.t0;

          case 22:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 19]]);
  }));

  return function getUserByToken(_x19, _x20, _x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

var getUserById =
/*#__PURE__*/
function () {
  var _ref12 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee8(_, args, ctx, info) {
    var result;
    return _regenerator.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _userModel.default.findById({
              _id: args._id
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

  return function getUserById(_x23, _x24, _x25, _x26) {
    return _ref12.apply(this, arguments);
  };
}();

var getUserByUsername =
/*#__PURE__*/
function () {
  var _ref13 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee9(_, args, ctx, info) {
    var result;
    return _regenerator.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _userModel.default.findOne({
              username: args.input
            });

          case 2:
            result = _context9.sent;
            return _context9.abrupt("return", result);

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function getUserByUsername(_x27, _x28, _x29, _x30) {
    return _ref13.apply(this, arguments);
  };
}();

var forgotPassword =
/*#__PURE__*/
function () {
  var _ref16 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee10(_, _ref14, _ref15) {
    var email, redis, url, user, link;
    return _regenerator.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            email = _ref14.email;
            redis = _ref15.redis, url = _ref15.url;
            _context10.next = 4;
            return _userModel.default.findOne({
              email: email
            });

          case 4:
            user = _context10.sent;
            _context10.t0 = _mail.sendForgotPasswordEmail;
            _context10.t1 = user.email;
            _context10.next = 9;
            return (0, _createForgotPasswordLink.createForgotPasswordLink)(url, user._id, redis);

          case 9:
            _context10.t2 = _context10.sent;
            _context10.next = 12;
            return (0, _context10.t0)(_context10.t1, _context10.t2);

          case 12:
            link = _context10.sent;
            return _context10.abrupt("return", true);

          case 14:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function forgotPassword(_x31, _x32, _x33) {
    return _ref16.apply(this, arguments);
  };
}();

var updateMe = function updateMe(_, _ref17, _ref18) {
  var input = _ref17.input;
  var user = _ref18.user;
  merge(user, input);
  return user.save();
};

var getSubscriptions =
/*#__PURE__*/
function () {
  var _ref20 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee11(_, args, _ref19) {
    var user, subscriptions;
    return _regenerator.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            user = _ref19.user;
            _context11.prev = 1;
            _context11.next = 4;
            return _userModel.default.findById(userId);

          case 4:
            subscriptions = _context11.sent;
            return _context11.abrupt("return", (0, _objectSpread2.default)({}, subscriptions._doc, {
              _id: subscriptions.id
            }));

          case 8:
            _context11.prev = 8;
            _context11.t0 = _context11["catch"](1);
            throw _context11.t0;

          case 11:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[1, 8]]);
  }));

  return function getSubscriptions(_x34, _x35, _x36) {
    return _ref20.apply(this, arguments);
  };
}();

var userResolvers = {
  Query: {
    getSubscriptions: getSubscriptions,
    getUserById: getUserById,
    getUserByToken: getUserByToken,
    getUserByUsername: getUserByUsername,
    hello: function hello(_, _ref21) {
      var name = _ref21.name;
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
    confirmEmail: confirmEmail,
    contact: contact,
    forgotPassword: forgotPassword,
    signup: signup,
    login: login,
    updateMe: updateMe
  }
};
exports.userResolvers = userResolvers;