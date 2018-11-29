"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userResolvers = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _yup = require("yup");

var yup = _interopRequireWildcard(_yup);

var _auth = require("../../auth/auth");

var _errorMessages = require("../shared/error-messages.js");

var _createConfirmationEmailLink = require("../../utils/create-confirmation-email-link.js");

var _createForgotPasswordLink = require("../../utils/create-forgot-password-link.js");

var _constants = require("../../constants");

var _formatYupError = require("../../utils/format-yup-error.js");

var _mail = require("../../mail/mail");

var _userModel = require("./user-model.js");

var _userModel2 = _interopRequireDefault(_userModel);

var _common = require("@utterzone/common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var newPasswordSchema = yup.object().shape({
  newPassword: _common.PasswordValidation
}); /* eslint-enable no-unused-vars */


var forgotPasswordChange = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_, _ref2, _ref3) {
    var newPassword = _ref2.newPassword,
        key = _ref2.key;
    var redis = _ref3.redis,
        url = _ref3.url;
    var redisKey, userId, hashedPassword, updatePromise, deleteKeyPromise;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            redisKey = _constants.forgotPasswordPrefix + " " + key;
            userId = redis.get(redisKey);

            if (userId) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", [{
              path: "key",
              message: expiredKey
            }]);

          case 4:
            _context.prev = 4;
            _context.next = 7;
            return newPasswordSchema.validate({ newPassword: newPassword }.input, { abortEarly: false });

          case 7:
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](4);

            if (_context.t0) {
              arrayOfErrors = (0, _formatYupError.formatYupError)(_context.t0);
            }

          case 12:
            hashedPassword = user.encryptPassword(newPassword);
            updatePromise = user.findByIdAndUpdate(userId, {
              $set: { forgotPasswordLocked: false, password: hashedPassword }
            });
            deleteKeyPromise = redis.del(redisKey);
            _context.next = 17;
            return Promise.all([updatePromise, deleteKeyPromise]);

          case 17:
            return _context.abrupt("return", null);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[4, 9]]);
  }));

  return function forgotPasswordChange(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var signup = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_, args, _ref5, info) {
    var redis = _ref5.redis,
        url = _ref5.url;

    var token, arrayOfErrors, _args$input, username, email, password, foundDupeEmail, error, newUser, signedUser;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            token = null;
            arrayOfErrors = [];
            _context2.prev = 2;
            _context2.next = 5;
            return _common.signupSchema.validate(args.input, { abortEarly: false });

          case 5:
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](2);

            if (_context2.t0) {
              arrayOfErrors = (0, _formatYupError.formatYupError)(_context2.t0);
            }

          case 10:
            _args$input = args.input, username = _args$input.username, email = _args$input.email, password = _args$input.password;
            _context2.next = 13;
            return _userModel2.default.findOne({ email: email }).exec();

          case 13:
            foundDupeEmail = _context2.sent;


            if (foundDupeEmail !== null) {
              error = {
                path: "email",
                message: _errorMessages.duplicateEmail
              };

              arrayOfErrors.push(error);
            }

            // Valid with unique email

            if (!(foundDupeEmail === null && (0, _isEmpty2.default)(arrayOfErrors))) {
              _context2.next = 28;
              break;
            }

            newUser = new _userModel2.default(args.input);
            _context2.next = 19;
            return newUser.save();

          case 19:
            signedUser = _context2.sent;

            token = (0, _auth.signToken)(signedUser._id);
            _context2.t1 = _mail.sendConfirmEmail;
            _context2.t2 = newUser.email;
            _context2.next = 25;
            return (0, _createConfirmationEmailLink.createEmailConfirmLink)(url, signedUser._id, redis);

          case 25:
            _context2.t3 = _context2.sent;
            _context2.next = 28;
            return (0, _context2.t1)(_context2.t2, _context2.t3);

          case 28:
            return _context2.abrupt("return", {
              token: token,
              error: arrayOfErrors
            });

          case 29:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[2, 7]]);
  }));

  return function signup(_x4, _x5, _x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

var login = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(parent, args, context, info) {
    var _args$input2, identifier, password, token, arrayOfErrors, username, email, criteria, user;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
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
            console.log("criteria: ", criteria);
            // check if passwords match
            _context3.next = 9;
            return _userModel2.default.findOne(criteria).exec();

          case 9:
            user = _context3.sent;

            if (user) {
              _context3.next = 14;
              break;
            }

            arrayOfErrors.push({
              path: "identifier",
              message: "invalid username or email"
            });
            _context3.next = 26;
            break;

          case 14:
            if (user.authenticate(password)) {
              _context3.next = 18;
              break;
            }

            // use authenticate() on user.doc, pass in the posted password, hash it and check
            arrayOfErrors.push({ path: "password", message: "Invalid Password" });
            _context3.next = 26;
            break;

          case 18:
            if (!user.forgotPasswordLocked) {
              _context3.next = 22;
              break;
            }

            /* else if (!user.confirmed) { */
            /*   arrayOfErrors.push({ */
            /*     path: "identifier", */
            /*     message: confirmEmail */
            /*   }) */
            /* } */
            arrayOfErrors.push({
              path: "identifier",
              message: _errorMessages.passwordLocked
            });
            _context3.next = 26;
            break;

          case 22:
            if (!user) {
              _context3.next = 26;
              break;
            }

            _context3.next = 25;
            return (0, _auth.signToken)(user._id);

          case 25:
            token = _context3.sent;

          case 26:
            return _context3.abrupt("return", {
              token: token,
              error: arrayOfErrors
            });

          case 27:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function login(_x8, _x9, _x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();

var getUserById = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_, args, ctx, info) {
    var result;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _userModel2.default.findOne({ id: args.input });

          case 2:
            result = _context4.sent;
            return _context4.abrupt("return", result);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getUserById(_x12, _x13, _x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();

var getUserByUsername = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_, args, ctx, info) {
    var result;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log("userID: ", ctx);
            // const getUserByUsername = (_, __, {user}) => {
            _context5.next = 3;
            return _userModel2.default.findOne({ username: args.input });

          case 3:
            result = _context5.sent;
            return _context5.abrupt("return", result);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function getUserByUsername(_x16, _x17, _x18, _x19) {
    return _ref8.apply(this, arguments);
  };
}();

var forgotPassword = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(_, _ref10, _ref11) {
    var email = _ref10.email;
    var redis = _ref11.redis,
        url = _ref11.url;
    var user;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _userModel2.default.findOne({ email: email });

          case 2:
            user = _context6.sent;

            if (user) {
              _context6.next = 5;
              break;
            }

            return _context6.abrupt("return", [{
              path: "email",
              message: _errorMessages.userNotFound
            }]);

          case 5:
            _context6.t0 = _mail.sendForgotPasswordEmail;
            _context6.t1 = user.email;
            _context6.next = 9;
            return (0, _createForgotPasswordLink.createForgotPasswordLink)(url, user._id, redis);

          case 9:
            _context6.t2 = _context6.sent;
            _context6.next = 12;
            return (0, _context6.t0)(_context6.t1, _context6.t2);

          case 12:
            return _context6.abrupt("return", [{
              path: "email",
              message: "email sent"
            }]);

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function forgotPassword(_x20, _x21, _x22) {
    return _ref9.apply(this, arguments);
  };
}();

var updateMe = function updateMe(_, _ref12, _ref13) {
  var input = _ref12.input;
  var user = _ref13.user;

  merge(user, input);
  return user.save();
};

var userResolvers = exports.userResolvers = {
  Query: {
    getUserById: getUserById,
    getUserByUsername: getUserByUsername,
    hello: function hello(_, _ref14) {
      var name = _ref14.name;
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
    forgotPasswordChange: forgotPasswordChange,
    forgotPassword: forgotPassword,
    signup: signup,
    login: login,
    updateMe: updateMe
  }
};