"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userResolvers = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

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

var _stripe = require("../../stripe.js");

var _common = require("@utterzone/common");

var me = function () {
  var _ref2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(_, __, _ref) {
    var req;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req = _ref.req;
            console.log("req: ", req.session);

            if (req.session.userId) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", null);

          case 4:
            return _context.abrupt("return", _userModel.default.findById(req.session.userId).populate("subscriptions").lean());

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function me(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var addContact = function () {
  var _ref4 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(_, args, _ref3) {
    var redis, url;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            redis = _ref3.redis, url = _ref3.url;
            console.log("args; ", args);
            return _context2.abrupt("return", {
              _id: "blah",
              username: "fomasa"
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function addContact(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var confirmEmail = function () {
  var _ref6 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(_, args, _ref5) {
    var redis, url, redisToken, redisKey, userId;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            redis = _ref5.redis, url = _ref5.url;
            redisToken = args.input.token;
            redisKey = "".concat(_constants.confirmEmailPrefix).concat(redisToken);
            _context3.next = 5;
            return redis.get(redisKey);

          case 5:
            userId = _context3.sent;

            if (userId) {
              _context3.next = 9;
              break;
            }

            arrayOfErrors.push({
              path: "password",
              message: _errorMessages.expiredKeyError
            });
            return _context3.abrupt("return", {
              token: null,
              error: arrayOfErrors
            });

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function confirmEmail(_x7, _x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();

var contact = function () {
  var _ref8 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4(_, args, _ref7) {
    var redis, url, email;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            redis = _ref7.redis, url = _ref7.url;
            _context4.next = 3;
            return (0, _mail.sendContactEmail)(args);

          case 3:
            email = _context4.sent;
            return _context4.abrupt("return", {
              success: email.accepted,
              errors: email.rejected
            });

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function contact(_x10, _x11, _x12) {
    return _ref8.apply(this, arguments);
  };
}();

var cancelPayMonthly = function () {
  var _ref10 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5(_, __, _ref9, ___) {
    var req, user, customer, _customer$subscriptio, subscription;

    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            req = _ref9.req;

            if (!(!req.session || !req.session.userId)) {
              _context5.next = 3;
              break;
            }

            throw new Error("Not authenticated.");

          case 3:
            _context5.next = 5;
            return _userModel.default.findByIdAndUpdate(req.session.userId, {
              isCanceled: true,
              ccLast4: null,
              $pull: {
                roles: "payMonthly"
              }
            }, {
              new: true
            }).lean();

          case 5:
            user = _context5.sent;

            if (!(!user || !user.stripeId || !user.roles.includes("payMonthly"))) {
              _context5.next = 8;
              break;
            }

            throw new Error();

          case 8:
            _context5.next = 10;
            return _stripe.stripe.customers.retreive(user.stripeId);

          case 10:
            customer = _context5.sent;
            _customer$subscriptio = (0, _slicedToArray2.default)(customer.subscriptions.data, 1), subscription = _customer$subscriptio[0];
            _context5.next = 14;
            return _stripe.stripe.subscriptions.del(subscription.id);

          case 14:
            if (!customer.default_source) {
              _context5.next = 17;
              break;
            }

            _context5.next = 17;
            return _stripe.stripe.customers.deleteCard(user.stripeId, customer.default_source);

          case 17:
            return _context5.abrupt("return", user);

          case 18:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function cancelPayMonthly(_x13, _x14, _x15, _x16) {
    return _ref10.apply(this, arguments);
  };
}();

var changeCreditCard = function () {
  var _ref13 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee6(_, _ref11, _ref12, __) {
    var source, ccLast4, req, user, customer;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            source = _ref11.source, ccLast4 = _ref11.ccLast4;
            req = _ref12.req;

            if (!(!req.session || !req.session.userId)) {
              _context6.next = 4;
              break;
            }

            throw new Error("Not authenticated.");

          case 4:
            _context6.next = 6;
            return _userModel.default.findByIdAndUpdate(req.session.userId, {
              ccLast4: ccLast4
            }, {
              new: true
            }).lean();

          case 6:
            user = _context6.sent;

            if (!(!user || !user.stripeId || !user.roles.includes("payMonthly"))) {
              _context6.next = 9;
              break;
            }

            throw new Error();

          case 9:
            _context6.next = 11;
            return _stripe.stripe.customers.update(user.stripeId, {
              source: source
            });

          case 11:
            customer = _context6.sent;

            if (customer) {
              _context6.next = 14;
              break;
            }

            throw new Error();

          case 14:
            return _context6.abrupt("return", user);

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function changeCreditCard(_x17, _x18, _x19, _x20) {
    return _ref13.apply(this, arguments);
  };
}();

var changePassword = function () {
  var _ref16 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee7(_, _ref14, _ref15) {
    var input, redis, url, token, arrayOfErrors, redisToken, redisKey, userId, user, hashedPassword, updatePromise, deleteKeyPromise;
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            input = _ref14.input;
            redis = _ref15.redis, url = _ref15.url;
            token = null;
            arrayOfErrors = [];
            redisToken = input.token;
            redisKey = "".concat(_constants.forgotPasswordPrefix).concat(redisToken);
            _context7.next = 8;
            return redis.get(redisKey);

          case 8:
            userId = _context7.sent;

            if (userId) {
              _context7.next = 12;
              break;
            }

            arrayOfErrors.push({
              path: "password",
              message: _errorMessages.expiredKeyError
            });
            return _context7.abrupt("return", {
              token: null,
              error: arrayOfErrors
            });

          case 12:
            _context7.prev = 12;
            input["password confirmation"] = input.passwordConfirmation;
            _context7.next = 16;
            return _common.changePasswordSchema.validate(input, {
              abortEarly: false
            });

          case 16:
            _context7.next = 23;
            break;

          case 18:
            _context7.prev = 18;
            _context7.t0 = _context7["catch"](12);

            if (!_context7.t0) {
              _context7.next = 23;
              break;
            }

            arrayOfErrors = (0, _formatYupError.formatYupError)(_context7.t0);
            return _context7.abrupt("return", {
              error: arrayOfErrors
            });

          case 23:
            _context7.next = 25;
            return _userModel.default.findById(userId).exec();

          case 25:
            user = _context7.sent;
            hashedPassword = user.encryptPassword(input.password);
            updatePromise = _userModel.default.findByIdAndUpdate(userId, {
              $set: {
                forgotPasswordLocked: false,
                password: hashedPassword
              }
            });
            token = (0, _auth.signToken)(user._id);
            deleteKeyPromise = redis.del(redisKey);
            _context7.next = 32;
            return Promise.all([updatePromise, deleteKeyPromise]);

          case 32:
            return _context7.abrupt("return", {
              token: token,
              error: []
            });

          case 33:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[12, 18]]);
  }));

  return function changePassword(_x21, _x22, _x23) {
    return _ref16.apply(this, arguments);
  };
}();

var createPayMonthly = function () {
  var _ref19 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee8(_, _ref17, _ref18, __) {
    var source, ccLast4, req, query, stripeId, customer, user;
    return _regenerator.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            source = _ref17.source, ccLast4 = _ref17.ccLast4;
            req = _ref18.req;
            console.log("ccLast4: ", ccLast4);

            if (!(!req.session || !req.session.userId)) {
              _context8.next = 5;
              break;
            }

            throw new Error("Not authenticated.");

          case 5:
            _context8.next = 7;
            return _userModel.default.findById(req.session.userId).lean();

          case 7:
            query = _context8.sent;
            stripeId = query.stripeId;

            if (stripeId) {
              _context8.next = 16;
              break;
            }

            _context8.next = 12;
            return _stripe.stripe.customers.create({
              email: query.email,
              source: source,
              plan: process.env.STRIPE_PLAN
            });

          case 12:
            customer = _context8.sent;
            stripeId = customer.id;
            _context8.next = 20;
            break;

          case 16:
            _context8.next = 18;
            return _stripe.stripe.customers.update(stripeId, {
              source: source
            });

          case 18:
            _context8.next = 20;
            return _stripe.stripe.subscriptions.create({
              customer: stripeId,
              items: [{
                plan: process.env.STRIPE_PLAN
              }]
            });

          case 20:
            _context8.next = 22;
            return _userModel.default.findByIdAndUpdate(req.session.userId, {
              ccLast4: ccLast4,
              stripeId: stripeId,
              $addToSet: {
                roles: "payMonthly"
              }
            }, {
              new: true
            }).lean();

          case 22:
            user = _context8.sent;

            if (user) {
              _context8.next = 25;
              break;
            }

            throw new Error();

          case 25:
            return _context8.abrupt("return", user);

          case 26:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function createPayMonthly(_x24, _x25, _x26, _x27) {
    return _ref19.apply(this, arguments);
  };
}();

var signup = function () {
  var _ref21 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee10(_, args, _ref20, info) {
    var redis, url, token, arrayOfErrors, _args$input, username, email, password, foundDupeEmail, foundDupeUsername, error, newUser;

    return _regenerator.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            redis = _ref20.redis, url = _ref20.url;
            args.input["password confirmation"] = args.input.passwordConfirmation;
            token = null;
            arrayOfErrors = [];
            _context10.prev = 4;
            _context10.next = 7;
            return _common.signupSchema.validate(args.input, {
              abortEarly: false
            });

          case 7:
            _context10.next = 12;
            break;

          case 9:
            _context10.prev = 9;
            _context10.t0 = _context10["catch"](4);

            if (_context10.t0) {
              arrayOfErrors = (0, _formatYupError.formatYupError)(_context10.t0);
            }

          case 12:
            _args$input = args.input, username = _args$input.username, email = _args$input.email, password = _args$input.password;
            _context10.next = 15;
            return _userModel.default.findOne({
              email: email
            }).exec();

          case 15:
            foundDupeEmail = _context10.sent;
            _context10.next = 18;
            return _userModel.default.findOne({
              username: username
            }).exec();

          case 18:
            foundDupeUsername = _context10.sent;

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

            if (!(foundDupeEmail === null && (0, _lodash.isEmpty)(arrayOfErrors))) {
              _context10.next = 24;
              break;
            }

            newUser = new _userModel.default(args.input);
            return _context10.abrupt("return", newUser.save().then(function () {
              var _ref22 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee9(result) {
                var link;
                return _regenerator.default.wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        token = (0, _auth.signToken)(newUser._id);
                        result.password = null;
                        _context9.t0 = _mail.sendConfirmEmail;
                        _context9.t1 = newUser.email;
                        _context9.next = 6;
                        return (0, _createConfirmationEmailLink.createEmailConfirmLink)(url, newUser._id, redis);

                      case 6:
                        _context9.t2 = _context9.sent;
                        _context9.next = 9;
                        return (0, _context9.t0)(_context9.t1, _context9.t2);

                      case 9:
                        link = _context9.sent;
                        return _context9.abrupt("return", {
                          token: token,
                          user: result,
                          error: arrayOfErrors
                        });

                      case 11:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9);
              }));

              return function (_x32) {
                return _ref22.apply(this, arguments);
              };
            }()).catch(function (err) {
              throw err;
            }));

          case 24:
            return _context10.abrupt("return", {
              error: arrayOfErrors
            });

          case 25:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[4, 9]]);
  }));

  return function signup(_x28, _x29, _x30, _x31) {
    return _ref21.apply(this, arguments);
  };
}();

var login = function () {
  var _ref23 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee11(parent, args, ctx, info) {
    var _args$input2, identifier, password, token, arrayOfErrors, username, email, criteria, user;

    return _regenerator.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
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
            }

            _context11.next = 7;
            return _userModel.default.findOne(criteria).populate("hostedZone").populate("subscriptions").exec();

          case 7:
            user = _context11.sent;
            console.log("user: ", user);

            if (user.isCanceled) {
              arrayOfErrors.push({
                path: "identifier",
                message: "This account has been canceled."
              });
            }

            if (user) {
              _context11.next = 14;
              break;
            }

            arrayOfErrors.push({
              path: "identifier",
              message: "invalid username or email"
            });
            _context11.next = 27;
            break;

          case 14:
            if (user.authenticate(password)) {
              _context11.next = 18;
              break;
            }

            arrayOfErrors.push({
              path: "password",
              message: "Invalid Password"
            });
            _context11.next = 27;
            break;

          case 18:
            if (!user.forgotPasswordLocked) {
              _context11.next = 22;
              break;
            }

            arrayOfErrors.push({
              path: "identifier",
              message: _errorMessages.passwordLocked
            });
            _context11.next = 27;
            break;

          case 22:
            if (!user) {
              _context11.next = 27;
              break;
            }

            _context11.next = 25;
            return (0, _auth.signToken)(user._id);

          case 25:
            token = _context11.sent;
            ctx.req.session.userId = user._id;

          case 27:
            return _context11.abrupt("return", {
              token: token,
              user: user,
              error: arrayOfErrors
            });

          case 28:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function login(_x33, _x34, _x35, _x36) {
    return _ref23.apply(this, arguments);
  };
}();

var getUserByToken = function () {
  var _ref24 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee12(_, args, ctx, info) {
    var token, result, _userId, user;

    return _regenerator.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            token = args.token;

            if (!token) {
              _context12.next = 16;
              break;
            }

            _context12.next = 5;
            return _jsonwebtoken.default.verify(token, _config.default.env.JWT);

          case 5:
            result = _context12.sent;

            if (!result) {
              _context12.next = 14;
              break;
            }

            _userId = result._id;
            _context12.next = 10;
            return _userModel.default.findById(_userId).populate("subscriptions").lean();

          case 10:
            user = _context12.sent;
            return _context12.abrupt("return", user);

          case 14:
            return _context12.abrupt("return", {
              username: ""
            });

          case 15:
            return _context12.abrupt("return", result);

          case 16:
            _context12.next = 21;
            break;

          case 18:
            _context12.prev = 18;
            _context12.t0 = _context12["catch"](0);
            throw _context12.t0;

          case 21:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 18]]);
  }));

  return function getUserByToken(_x37, _x38, _x39, _x40) {
    return _ref24.apply(this, arguments);
  };
}();

var getUserById = function () {
  var _ref25 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee13(_, args, ctx, info) {
    var result;
    return _regenerator.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _userModel.default.findById({
              _id: args._id
            });

          case 2:
            result = _context13.sent;
            return _context13.abrupt("return", result);

          case 4:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function getUserById(_x41, _x42, _x43, _x44) {
    return _ref25.apply(this, arguments);
  };
}();

var getUserByUsername = function () {
  var _ref26 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee14(_, args, ctx, info) {
    var result;
    return _regenerator.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _userModel.default.findOne({
              username: args.input
            });

          case 2:
            result = _context14.sent;
            return _context14.abrupt("return", result);

          case 4:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));

  return function getUserByUsername(_x45, _x46, _x47, _x48) {
    return _ref26.apply(this, arguments);
  };
}();

var forgotPassword = function () {
  var _ref29 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee15(_, _ref27, _ref28) {
    var email, redis, url, user, link;
    return _regenerator.default.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            email = _ref27.email;
            redis = _ref28.redis, url = _ref28.url;
            _context15.next = 4;
            return _userModel.default.findOne({
              email: email
            });

          case 4:
            user = _context15.sent;
            _context15.t0 = _mail.sendForgotPasswordEmail;
            _context15.t1 = user.email;
            _context15.next = 9;
            return (0, _createForgotPasswordLink.createForgotPasswordLink)(url, user._id, redis);

          case 9:
            _context15.t2 = _context15.sent;
            _context15.next = 12;
            return (0, _context15.t0)(_context15.t1, _context15.t2);

          case 12:
            link = _context15.sent;
            return _context15.abrupt("return", true);

          case 14:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));

  return function forgotPassword(_x49, _x50, _x51) {
    return _ref29.apply(this, arguments);
  };
}();

var updateMe = function updateMe(_, _ref30, _ref31) {
  var input = _ref30.input;
  var user = _ref31.user;
  merge(user, input);
  return user.save();
};

var getSubscriptions = function () {
  var _ref33 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee16(_, args, _ref32) {
    var user, subscriptions;
    return _regenerator.default.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            user = _ref32.user;
            _context16.prev = 1;
            _context16.next = 4;
            return _userModel.default.findById(userId);

          case 4:
            subscriptions = _context16.sent;
            return _context16.abrupt("return", (0, _objectSpread2.default)({}, subscriptions._doc, {
              _id: subscriptions.id
            }));

          case 8:
            _context16.prev = 8;
            _context16.t0 = _context16["catch"](1);
            throw _context16.t0;

          case 11:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[1, 8]]);
  }));

  return function getSubscriptions(_x52, _x53, _x54) {
    return _ref33.apply(this, arguments);
  };
}();

var removeSubscription = function () {
  var _ref35 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee17(_, args, _ref34) {
    var req, user;
    return _regenerator.default.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            req = _ref34.req;
            _context17.next = 3;
            return _userModel.default.findByIdAndUpdate(req.session.userId, {
              $pull: {
                subscriptions: {
                  _id: args.subscribedCourse
                }
              }
            }, {
              new: true
            }).populate("subscriptions").populate("levels").lean();

          case 3:
            user = _context17.sent;
            return _context17.abrupt("return", user);

          case 5:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }));

  return function removeSubscription(_x55, _x56, _x57) {
    return _ref35.apply(this, arguments);
  };
}();

var renewConfirmation = function () {
  var _ref38 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee18(_, _ref36, _ref37, info) {
    var email, redis, url, registeredUser, link;
    return _regenerator.default.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            email = _ref36.email;
            redis = _ref37.redis, url = _ref37.url;
            _context18.prev = 2;
            _context18.next = 5;
            return _userModel.default.findOne({
              email: email
            }).exec();

          case 5:
            registeredUser = _context18.sent;

            if (!registeredUser) {
              _context18.next = 17;
              break;
            }

            _context18.t0 = _mail.sendReConfirmEmail;
            _context18.t1 = registeredUser.email;
            _context18.next = 11;
            return (0, _createConfirmationEmailLink.createEmailConfirmLink)(url, registeredUser._id, redis);

          case 11:
            _context18.t2 = _context18.sent;
            _context18.next = 14;
            return (0, _context18.t0)(_context18.t1, _context18.t2);

          case 14:
            link = _context18.sent;

            if (!link) {
              _context18.next = 17;
              break;
            }

            return _context18.abrupt("return", true);

          case 17:
            return _context18.abrupt("return", false);

          case 20:
            _context18.prev = 20;
            _context18.t3 = _context18["catch"](2);
            return _context18.abrupt("return", _context18.t3);

          case 23:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, null, [[2, 20]]);
  }));

  return function renewConfirmation(_x58, _x59, _x60, _x61) {
    return _ref38.apply(this, arguments);
  };
}();

var userResolvers = {
  Query: {
    getSubscriptions: getSubscriptions,
    getUserById: getUserById,
    getUserByToken: getUserByToken,
    getUserByUsername: getUserByUsername,
    hello: function hello(_, _ref39) {
      var name = _ref39.name;
      return "Hello ".concat(name || "World");
    },
    me: me
  },
  User: {
    contacts: function contacts(user) {
      return ["Tom", "Bob", "Harry"];
    }
  },
  Mutation: {
    addContact: addContact,
    cancelPayMonthly: cancelPayMonthly,
    changeCreditCard: changeCreditCard,
    changePassword: changePassword,
    confirmEmail: confirmEmail,
    contact: contact,
    createPayMonthly: createPayMonthly,
    forgotPassword: forgotPassword,
    removeSubscription: removeSubscription,
    renewConfirmation: renewConfirmation,
    signup: signup,
    login: login,
    updateMe: updateMe
  }
};
exports.userResolvers = userResolvers;