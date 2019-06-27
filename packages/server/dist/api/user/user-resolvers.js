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
  var _ref2 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(_, __, _ref) {
    var req, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req = _ref.req;

            if (req.session.userId) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", null);

          case 3:
            _context.next = 5;
            return _userModel["default"].findById(req.session.userId).populate("requests").lean();

          case 5:
            user = _context.sent;
            return _context.abrupt("return", user);

          case 7:
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

var acceptContact = function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2(_, args, _ref3) {
    var req, sender, contact, updatedSender;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            req = _ref3.req;
            console.log("args: ", args);

            if (req.session.userId) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", null);

          case 4:
            _context2.next = 6;
            return _userModel["default"].findOne({
              username: args.senderUsername
            }).lean();

          case 6:
            sender = _context2.sent;
            _context2.next = 9;
            return _userModel["default"].findOneAndUpdate({
              _id: req.session.userId,
              contacts: {
                $ne: sender._id
              }
            }, {
              $push: {
                contacts: sender
              },
              $pull: {
                requests: sender._id
              },
              $inc: {
                totalRequests: -1
              }
            }, {
              "new": true
            }).lean();

          case 9:
            contact = _context2.sent;
            _context2.next = 12;
            return _userModel["default"].updateOne({
              _id: sender._id,
              contacts: {
                $ne: contact._id
              }
            }, {
              $push: {
                contacts: contact
              },
              $pull: {
                sentRequests: {
                  username: contact.username
                }
              }
            }, {
              "new": true
            });

          case 12:
            updatedSender = _context2.sent;
            console.log("sender: ", sender);
            return _context2.abrupt("return", sender);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function acceptContact(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var rejectContact = function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3(_, args, _ref5) {
    var req, sender, contact, updatedSender;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            req = _ref5.req;

            if (req.session.userId) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", null);

          case 3:
            _context3.next = 5;
            return _userModel["default"].findOne({
              username: args.senderUsername
            }).lean();

          case 5:
            sender = _context3.sent;
            _context3.next = 8;
            return _userModel["default"].findOneAndUpdate({
              _id: req.session.userId,
              contacts: {
                $ne: sender._id
              }
            }, {
              $pull: {
                requests: sender._id
              },
              $inc: {
                totalRequests: -1
              }
            }, {
              "new": true
            }).lean();

          case 8:
            contact = _context3.sent;
            _context3.next = 11;
            return _userModel["default"].updateOne({
              _id: sender._id,
              contacts: {
                $ne: contact._id
              }
            }, {
              $pull: {
                sentRequests: {
                  username: contact.username
                }
              }
            }, {
              "new": true
            });

          case 11:
            updatedSender = _context3.sent;
            return _context3.abrupt("return", contact);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function rejectContact(_x7, _x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();

var addContact = function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee4(_, args, _ref7) {
    var redis, url, senderInfo, _contact, senderUpdated;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            redis = _ref7.redis, url = _ref7.url;
            _context4.prev = 1;
            _context4.next = 4;
            return _userModel["default"].findOne({
              username: args.sender
            }).exec();

          case 4:
            senderInfo = _context4.sent;
            _context4.next = 7;
            return _userModel["default"].findOneAndUpdate({
              username: args.contact,
              requests: {
                $ne: senderInfo._id
              },
              contacts: {
                $ne: senderInfo._id
              }
            }, {
              $push: {
                requests: senderInfo
              },
              $inc: {
                totalRequests: 1
              }
            }, {
              "new": true
            });

          case 7:
            _contact = _context4.sent;

            if (!args.sender) {
              _context4.next = 12;
              break;
            }

            _context4.next = 11;
            return _userModel["default"].updateOne({
              username: args.sender,
              "sentRequests.username": {
                $ne: args.contact
              }
            }, {
              $push: {
                sentRequests: {
                  username: args.contact
                }
              }
            }, {
              "new": true
            });

          case 11:
            senderUpdated = _context4.sent;

          case 12:
            if (_contact) {
              _context4.next = 14;
              break;
            }

            throw new Error("You have already sent this person a contact request.");

          case 14:
            return _context4.abrupt("return", {
              _id: _contact._id,
              username: args.sender
            });

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](1);
            return _context4.abrupt("return", _context4.t0);

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 17]]);
  }));

  return function addContact(_x10, _x11, _x12) {
    return _ref8.apply(this, arguments);
  };
}();

var confirmEmail = function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee5(_, args, _ref9) {
    var redis, url, redisToken, redisKey, userId;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            redis = _ref9.redis, url = _ref9.url;
            redisToken = args.input.token;
            redisKey = "".concat(_constants.confirmEmailPrefix).concat(redisToken);
            _context5.next = 5;
            return redis.get(redisKey);

          case 5:
            userId = _context5.sent;

            if (userId) {
              _context5.next = 9;
              break;
            }

            arrayOfErrors.push({
              path: "password",
              message: _errorMessages.expiredKeyError
            });
            return _context5.abrupt("return", {
              token: null,
              error: arrayOfErrors
            });

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function confirmEmail(_x13, _x14, _x15) {
    return _ref10.apply(this, arguments);
  };
}();

var contact = function () {
  var _ref12 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee6(_, args, _ref11) {
    var redis, url, email;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            redis = _ref11.redis, url = _ref11.url;
            _context6.next = 3;
            return (0, _mail.sendContactEmail)(args);

          case 3:
            email = _context6.sent;
            return _context6.abrupt("return", {
              success: email.accepted,
              errors: email.rejected
            });

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function contact(_x16, _x17, _x18) {
    return _ref12.apply(this, arguments);
  };
}();

var cancelPayMonthly = function () {
  var _ref14 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee7(_, __, _ref13, ___) {
    var req, user, customer, _customer$subscriptio, subscription;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            req = _ref13.req;

            if (!(!req.session || !req.session.userId)) {
              _context7.next = 3;
              break;
            }

            throw new Error("Not authenticated.");

          case 3:
            _context7.next = 5;
            return _userModel["default"].findByIdAndUpdate(req.session.userId, {
              isCanceled: true,
              ccLast4: null,
              $pull: {
                roles: "payMonthly"
              }
            }, {
              "new": true
            }).lean();

          case 5:
            user = _context7.sent;

            if (!(!user || !user.stripeId || !user.roles.includes("payMonthly"))) {
              _context7.next = 8;
              break;
            }

            throw new Error();

          case 8:
            _context7.next = 10;
            return _stripe.stripe.customers.retreive(user.stripeId);

          case 10:
            customer = _context7.sent;
            _customer$subscriptio = (0, _slicedToArray2["default"])(customer.subscriptions.data, 1), subscription = _customer$subscriptio[0];
            _context7.next = 14;
            return _stripe.stripe.subscriptions.del(subscription.id);

          case 14:
            if (!customer.default_source) {
              _context7.next = 17;
              break;
            }

            _context7.next = 17;
            return _stripe.stripe.customers.deleteCard(user.stripeId, customer.default_source);

          case 17:
            return _context7.abrupt("return", user);

          case 18:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function cancelPayMonthly(_x19, _x20, _x21, _x22) {
    return _ref14.apply(this, arguments);
  };
}();

var changeCreditCard = function () {
  var _ref17 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee8(_, _ref15, _ref16, __) {
    var source, ccLast4, req, user, customer;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            source = _ref15.source, ccLast4 = _ref15.ccLast4;
            req = _ref16.req;

            if (!(!req.session || !req.session.userId)) {
              _context8.next = 4;
              break;
            }

            throw new Error("Not authenticated.");

          case 4:
            _context8.next = 6;
            return _userModel["default"].findByIdAndUpdate(req.session.userId, {
              ccLast4: ccLast4
            }, {
              "new": true
            }).lean();

          case 6:
            user = _context8.sent;

            if (!(!user || !user.stripeId || !user.roles.includes("payMonthly"))) {
              _context8.next = 9;
              break;
            }

            throw new Error();

          case 9:
            _context8.next = 11;
            return _stripe.stripe.customers.update(user.stripeId, {
              source: source
            });

          case 11:
            customer = _context8.sent;

            if (customer) {
              _context8.next = 14;
              break;
            }

            throw new Error();

          case 14:
            return _context8.abrupt("return", user);

          case 15:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function changeCreditCard(_x23, _x24, _x25, _x26) {
    return _ref17.apply(this, arguments);
  };
}();

var changePassword = function () {
  var _ref20 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee9(_, _ref18, _ref19) {
    var input, redis, url, token, arrayOfErrors, redisToken, redisKey, userId, user, hashedPassword, updatePromise, deleteKeyPromise;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            input = _ref18.input;
            redis = _ref19.redis, url = _ref19.url;
            token = null;
            arrayOfErrors = [];
            redisToken = input.token;
            redisKey = "".concat(_constants.forgotPasswordPrefix).concat(redisToken);
            _context9.next = 8;
            return redis.get(redisKey);

          case 8:
            userId = _context9.sent;

            if (userId) {
              _context9.next = 12;
              break;
            }

            arrayOfErrors.push({
              path: "password",
              message: _errorMessages.expiredKeyError
            });
            return _context9.abrupt("return", {
              token: null,
              error: arrayOfErrors
            });

          case 12:
            _context9.prev = 12;
            input["password confirmation"] = input.passwordConfirmation;
            _context9.next = 16;
            return _common.changePasswordSchema.validate(input, {
              abortEarly: false
            });

          case 16:
            _context9.next = 23;
            break;

          case 18:
            _context9.prev = 18;
            _context9.t0 = _context9["catch"](12);

            if (!_context9.t0) {
              _context9.next = 23;
              break;
            }

            arrayOfErrors = (0, _formatYupError.formatYupError)(_context9.t0);
            return _context9.abrupt("return", {
              error: arrayOfErrors
            });

          case 23:
            _context9.next = 25;
            return _userModel["default"].findById(userId).exec();

          case 25:
            user = _context9.sent;
            hashedPassword = user.encryptPassword(input.password);
            updatePromise = _userModel["default"].findByIdAndUpdate(userId, {
              $set: {
                forgotPasswordLocked: false,
                password: hashedPassword
              }
            });
            token = (0, _auth.signToken)(user._id);
            deleteKeyPromise = redis.del(redisKey);
            _context9.next = 32;
            return Promise.all([updatePromise, deleteKeyPromise]);

          case 32:
            return _context9.abrupt("return", {
              token: token,
              error: []
            });

          case 33:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[12, 18]]);
  }));

  return function changePassword(_x27, _x28, _x29) {
    return _ref20.apply(this, arguments);
  };
}();

var createPayMonthly = function () {
  var _ref23 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee10(_, _ref21, _ref22, __) {
    var source, ccLast4, req, query, stripeId, customer, user;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            source = _ref21.source, ccLast4 = _ref21.ccLast4;
            req = _ref22.req;

            if (!(!req.session || !req.session.userId)) {
              _context10.next = 4;
              break;
            }

            throw new Error("Not authenticated.");

          case 4:
            _context10.next = 6;
            return _userModel["default"].findById(req.session.userId).lean();

          case 6:
            query = _context10.sent;
            stripeId = query.stripeId;

            if (stripeId) {
              _context10.next = 15;
              break;
            }

            _context10.next = 11;
            return _stripe.stripe.customers.create({
              email: query.email,
              source: source,
              plan: process.env.STRIPE_PLAN
            });

          case 11:
            customer = _context10.sent;
            stripeId = customer.id;
            _context10.next = 19;
            break;

          case 15:
            _context10.next = 17;
            return _stripe.stripe.customers.update(stripeId, {
              source: source
            });

          case 17:
            _context10.next = 19;
            return _stripe.stripe.subscriptions.create({
              customer: stripeId,
              items: [{
                plan: process.env.STRIPE_PLAN
              }]
            });

          case 19:
            _context10.next = 21;
            return _userModel["default"].findByIdAndUpdate(req.session.userId, {
              ccLast4: ccLast4,
              stripeId: stripeId,
              $addToSet: {
                roles: "payMonthly"
              }
            }, {
              "new": true
            }).lean();

          case 21:
            user = _context10.sent;

            if (user) {
              _context10.next = 24;
              break;
            }

            throw new Error();

          case 24:
            return _context10.abrupt("return", user);

          case 25:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function createPayMonthly(_x30, _x31, _x32, _x33) {
    return _ref23.apply(this, arguments);
  };
}();

var signup = function () {
  var _ref25 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee12(_, args, _ref24, info) {
    var redis, url, token, arrayOfErrors, _args$input, username, email, password, foundDupeEmail, foundDupeUsername, error, newUser;

    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            redis = _ref24.redis, url = _ref24.url;
            args.input["password confirmation"] = args.input.passwordConfirmation;
            token = null;
            arrayOfErrors = [];
            _context12.prev = 4;
            _context12.next = 7;
            return _common.signupSchema.validate(args.input, {
              abortEarly: false
            });

          case 7:
            _context12.next = 12;
            break;

          case 9:
            _context12.prev = 9;
            _context12.t0 = _context12["catch"](4);

            if (_context12.t0) {
              arrayOfErrors = (0, _formatYupError.formatYupError)(_context12.t0);
            }

          case 12:
            _args$input = args.input, username = _args$input.username, email = _args$input.email, password = _args$input.password;
            _context12.next = 15;
            return _userModel["default"].findOne({
              email: email
            }).exec();

          case 15:
            foundDupeEmail = _context12.sent;
            _context12.next = 18;
            return _userModel["default"].findOne({
              username: username
            }).exec();

          case 18:
            foundDupeUsername = _context12.sent;

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
              _context12.next = 24;
              break;
            }

            newUser = new _userModel["default"](args.input);
            return _context12.abrupt("return", newUser.save().then(function () {
              var _ref26 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee11(result) {
                var link;
                return _regenerator["default"].wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        token = (0, _auth.signToken)(newUser._id);
                        result.password = null;
                        _context11.t0 = _mail.sendConfirmEmail;
                        _context11.t1 = newUser.email;
                        _context11.next = 6;
                        return (0, _createConfirmationEmailLink.createEmailConfirmLink)(url, newUser._id, redis);

                      case 6:
                        _context11.t2 = _context11.sent;
                        _context11.next = 9;
                        return (0, _context11.t0)(_context11.t1, _context11.t2);

                      case 9:
                        link = _context11.sent;
                        return _context11.abrupt("return", {
                          token: token,
                          user: result,
                          error: arrayOfErrors
                        });

                      case 11:
                      case "end":
                        return _context11.stop();
                    }
                  }
                }, _callee11);
              }));

              return function (_x38) {
                return _ref26.apply(this, arguments);
              };
            }())["catch"](function (err) {
              throw err;
            }));

          case 24:
            return _context12.abrupt("return", {
              error: arrayOfErrors
            });

          case 25:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[4, 9]]);
  }));

  return function signup(_x34, _x35, _x36, _x37) {
    return _ref25.apply(this, arguments);
  };
}();

var login = function () {
  var _ref28 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee13(parent, args, ctx, _ref27) {
    var redis, _args$input2, identifier, password, token, arrayOfErrors, username, email, criteria, user;

    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            redis = _ref27.redis;
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

            _context13.next = 8;
            return _userModel["default"].findOne(criteria).populate("hostedZone").populate("requests").populate("subscriptions").populate("contacts").exec();

          case 8:
            user = _context13.sent;

            if (user && user.isCanceled) {
              arrayOfErrors.push({
                path: "identifier",
                message: "This account has been canceled."
              });
            }

            if (user) {
              _context13.next = 14;
              break;
            }

            arrayOfErrors.push({
              path: "identifier",
              message: "invalid username or email"
            });
            _context13.next = 27;
            break;

          case 14:
            if (user.authenticate(password)) {
              _context13.next = 18;
              break;
            }

            arrayOfErrors.push({
              path: "password",
              message: "Invalid Password"
            });
            _context13.next = 27;
            break;

          case 18:
            if (!user.forgotPasswordLocked) {
              _context13.next = 22;
              break;
            }

            arrayOfErrors.push({
              path: "identifier",
              message: _errorMessages.passwordLocked
            });
            _context13.next = 27;
            break;

          case 22:
            if (!user) {
              _context13.next = 27;
              break;
            }

            _context13.next = 25;
            return (0, _auth.signToken)(user._id);

          case 25:
            token = _context13.sent;
            ctx.req.session.userId = user._id;

          case 27:
            return _context13.abrupt("return", {
              token: token,
              user: user,
              error: arrayOfErrors
            });

          case 28:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function login(_x39, _x40, _x41, _x42) {
    return _ref28.apply(this, arguments);
  };
}();

var getUserByToken = function () {
  var _ref29 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee14(_, args, ctx, info) {
    var token, result, _userId, user;

    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            token = args.token;

            if (!token) {
              _context14.next = 16;
              break;
            }

            _context14.next = 5;
            return _jsonwebtoken["default"].verify(token, _config["default"].env.JWT);

          case 5:
            result = _context14.sent;

            if (!result) {
              _context14.next = 14;
              break;
            }

            _userId = result._id;
            _context14.next = 10;
            return _userModel["default"].findById(_userId).populate("subscriptions").lean();

          case 10:
            user = _context14.sent;
            return _context14.abrupt("return", user);

          case 14:
            return _context14.abrupt("return", {
              username: ""
            });

          case 15:
            return _context14.abrupt("return", result);

          case 16:
            _context14.next = 21;
            break;

          case 18:
            _context14.prev = 18;
            _context14.t0 = _context14["catch"](0);
            throw _context14.t0;

          case 21:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 18]]);
  }));

  return function getUserByToken(_x43, _x44, _x45, _x46) {
    return _ref29.apply(this, arguments);
  };
}();

var getUserById = function () {
  var _ref30 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee15(_, args, ctx, info) {
    var result;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return _userModel["default"].findById({
              _id: args._id
            });

          case 2:
            result = _context15.sent;
            return _context15.abrupt("return", result);

          case 4:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));

  return function getUserById(_x47, _x48, _x49, _x50) {
    return _ref30.apply(this, arguments);
  };
}();

var getUserByUsername = function () {
  var _ref31 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee16(_, args, ctx, info) {
    var result;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return _userModel["default"].findOne({
              username: args.input
            });

          case 2:
            result = _context16.sent;
            return _context16.abrupt("return", result);

          case 4:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));

  return function getUserByUsername(_x51, _x52, _x53, _x54) {
    return _ref31.apply(this, arguments);
  };
}();

var forgotPassword = function () {
  var _ref34 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee17(_, _ref32, _ref33) {
    var email, redis, url, user, link;
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            email = _ref32.email;
            redis = _ref33.redis, url = _ref33.url;
            _context17.next = 4;
            return _userModel["default"].findOne({
              email: email
            });

          case 4:
            user = _context17.sent;
            _context17.t0 = _mail.sendForgotPasswordEmail;
            _context17.t1 = user.email;
            _context17.next = 9;
            return (0, _createForgotPasswordLink.createForgotPasswordLink)(url, user._id, redis);

          case 9:
            _context17.t2 = _context17.sent;
            _context17.next = 12;
            return (0, _context17.t0)(_context17.t1, _context17.t2);

          case 12:
            link = _context17.sent;
            return _context17.abrupt("return", true);

          case 14:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }));

  return function forgotPassword(_x55, _x56, _x57) {
    return _ref34.apply(this, arguments);
  };
}();

var getUsers = function () {
  var _ref35 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee18(_, args, ctx, info) {
    var options, query, key;
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            console.log("args: ", args);
            options = {
              lean: true,
              page: args.page,
              limit: 24,
              collation: {
                locale: "en"
              },
              sort: {
                subscriberCount: "desc"
              }
            };
            delete args.page;
            query = {};

            for (key in args) {
              args[key] !== "" ? query[key] = args[key] : null;
            }

            return _context18.abrupt("return", _userModel["default"].paginate(query, options, function (err, result) {
              return {
                page: result.page,
                users: result.docs,
                more: result.hasNextPage
              };
            }));

          case 6:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }));

  return function getUsers(_x58, _x59, _x60, _x61) {
    return _ref35.apply(this, arguments);
  };
}();

var updateMe = function updateMe(_, _ref36, _ref37) {
  var input = _ref36.input;
  var user = _ref37.user;
  merge(user, input);
  return user.save();
};

var getNotifications = function () {
  var _ref39 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee19(_, __, _ref38) {
    var req, user;
    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            req = _ref38.req;

            if (req.session.userId) {
              _context19.next = 3;
              break;
            }

            return _context19.abrupt("return", null);

          case 3:
            _context19.next = 5;
            return _userModel["default"].findById(req.session.userId).populate("requests").lean();

          case 5:
            user = _context19.sent;
            return _context19.abrupt("return", user);

          case 7:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  }));

  return function getNotifications(_x62, _x63, _x64) {
    return _ref39.apply(this, arguments);
  };
}();

var getSubscriptions = function () {
  var _ref41 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee20(_, args, _ref40) {
    var user, subscriptions;
    return _regenerator["default"].wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            user = _ref40.user;
            _context20.prev = 1;
            _context20.next = 4;
            return _userModel["default"].findById(userId);

          case 4:
            subscriptions = _context20.sent;
            return _context20.abrupt("return", (0, _objectSpread2["default"])({}, subscriptions._doc, {
              _id: subscriptions.id
            }));

          case 8:
            _context20.prev = 8;
            _context20.t0 = _context20["catch"](1);
            throw _context20.t0;

          case 11:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20, null, [[1, 8]]);
  }));

  return function getSubscriptions(_x65, _x66, _x67) {
    return _ref41.apply(this, arguments);
  };
}();

var removeSubscription = function () {
  var _ref43 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee21(_, args, _ref42) {
    var req, user;
    return _regenerator["default"].wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            req = _ref42.req;
            _context21.next = 3;
            return _userModel["default"].findByIdAndUpdate(req.session.userId, {
              $pull: {
                subscriptions: {
                  _id: args.subscribedCourse
                }
              }
            }, {
              "new": true
            }).populate("subscriptions").populate("levels").lean();

          case 3:
            user = _context21.sent;
            return _context21.abrupt("return", user);

          case 5:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21);
  }));

  return function removeSubscription(_x68, _x69, _x70) {
    return _ref43.apply(this, arguments);
  };
}();

var renewConfirmation = function () {
  var _ref46 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee22(_, _ref44, _ref45, info) {
    var email, redis, url, registeredUser, link;
    return _regenerator["default"].wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            email = _ref44.email;
            redis = _ref45.redis, url = _ref45.url;
            _context22.prev = 2;
            _context22.next = 5;
            return _userModel["default"].findOne({
              email: email
            }).exec();

          case 5:
            registeredUser = _context22.sent;

            if (!registeredUser) {
              _context22.next = 17;
              break;
            }

            _context22.t0 = _mail.sendReConfirmEmail;
            _context22.t1 = registeredUser.email;
            _context22.next = 11;
            return (0, _createConfirmationEmailLink.createEmailConfirmLink)(url, registeredUser._id, redis);

          case 11:
            _context22.t2 = _context22.sent;
            _context22.next = 14;
            return (0, _context22.t0)(_context22.t1, _context22.t2);

          case 14:
            link = _context22.sent;

            if (!link) {
              _context22.next = 17;
              break;
            }

            return _context22.abrupt("return", true);

          case 17:
            return _context22.abrupt("return", false);

          case 20:
            _context22.prev = 20;
            _context22.t3 = _context22["catch"](2);
            return _context22.abrupt("return", _context22.t3);

          case 23:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22, null, [[2, 20]]);
  }));

  return function renewConfirmation(_x71, _x72, _x73, _x74) {
    return _ref46.apply(this, arguments);
  };
}();

var userResolvers = {
  Query: {
    getNotifications: getNotifications,
    getSubscriptions: getSubscriptions,
    getUserById: getUserById,
    getUserByToken: getUserByToken,
    getUserByUsername: getUserByUsername,
    getUsers: getUsers,
    hello: function hello(_, _ref47) {
      var name = _ref47.name;
      return "Hello ".concat(name || "World");
    },
    me: me
  },
  Mutation: {
    addContact: addContact,
    acceptContact: acceptContact,
    rejectContact: rejectContact,
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