"use strict";

var _ioredis = _interopRequireDefault(require("ioredis"));

var _graphqlRequest = require("graphql-request");

var _chalk = _interopRequireDefault(require("chalk"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _common = require("@utterzone/common");

var _createConfirmEmailLink = require("../../utils/create-confirm-email-link");

var _errorMessages = require("../shared/error-messages.js");

var _userModel = _interopRequireDefault(require("./user-model.js"));

var _config = _interopRequireDefault(require("../../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

afterAll(function () {
  // mongoose.connection.db.dropDatabase()
  _mongoose.default.disconnect();
});
var userId = "";
var redis = new _ioredis.default();
beforeAll(function () {
  jest.setTimeout(40000);
  var newUser = new _userModel.default({
    email: "bob@bob.com",
    password: "bobbobbobbob"
  });
  userId = newUser._id;
  var signedUser = newUser.save(function (err, doc) {
    if (err) {
      console.log(err);
    }

    return doc;
  });
});
var email = "trash@trash.com";
var username = "trash";
var password = "trash";
var newPassword = "878sdf8a8";

var signupMutation = function signupMutation(username, email, password) {
  return "\n  mutation {\n    signup(input: {username: \"".concat(username, "\", password: \"").concat(password, "\", email: \"").concat(email, "\"}) {\n      token\n\t\t\terror {\n\t\t\t\tpath\n\t\t\t\tmessage\n\t\t\t}\n    }\n  }\n");
};

var loginMutation = function loginMutation(username, email, password) {
  return "\n  mutation {\n    login(identifier: \"".concat(username, "\", password: \"").concat(password, "\") {\n      token\n\t\t\terror {\n\t\t\t\tpath\n\t\t\t\tmessage\n\t\t\t}\n    }\n  }\n");
};

var forgotPasswordMutation = function forgotPasswordMutation(newPassword, key) {
  return "\n\tmutation {\n\t\tforgotPasswordChange(newPassword: \"".concat(newPassword, "\", key: \"").concat(key, "\") {\n\t\t  path\n\t\t\tmessage\n\t\t}\n\t}\n");
};

try {
  describe("Signup User",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            it("check for duplicate emails",
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee() {
              var response, dupe;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return (0, _graphqlRequest.request)(_config.default.host + "/graphql", signupMutation(username, email, password));

                    case 2:
                      response = _context.sent;
                      expect(response.signup.token).toBeDefined(); // no duplicate users

                      _context.next = 6;
                      return (0, _graphqlRequest.request)(_config.default.host + "/graphql", signupMutation(username, email, password));

                    case 6:
                      dupe = _context.sent;
                      expect(dupe.signup.token).toBeNull();

                    case 8:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })));
            it("check for bad emails",
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee2() {
              var emailCheck;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return (0, _graphqlRequest.request)(_config.default.host + "/graphql", signupMutation("frankie", "x", password));

                    case 2:
                      emailCheck = _context2.sent;
                      expect(emailCheck.signup.token).toBeNull();
                      /* expect(emailCheck.signup[0].path).toEqual({ */

                      /*   path: "email", */

                      /*   message: emailNotLongEnough */

                      /* }) */

                    case 4:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            })));
            it("validate passwords",
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee3() {
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3);
            }))); // bad password and email
            // TODO: need tests for:
            // * how to use async/await with mongoose
            // * has user been saved to db?
            // * email is email
            // * password is not equal to password
            // * unique values should be unique
            // * test another response for duplicate records

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  describe("Login User",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7() {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            it("invalid identifier login",
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee5() {
              var response;
              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return (0, _graphqlRequest.request)(_config.default.host + "/graphql", loginMutation("someUser", password));

                    case 2:
                      response = _context5.sent;
                      expect(response.login.error).toEqual([{
                        path: "identifier",
                        message: _errorMessages.invalidLogin
                      }]);

                    case 4:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5);
            })));
            it("email not confirmed",
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee6() {
              return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6);
            })));

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  describe("Forgot Password", function () {
    it("ensures it works",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var url, segments, key, response;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return (0, _createConfirmEmailLink.createEmailConfirmLink)("", userId
              /*redis*/
              );

            case 2:
              url = _context8.sent;
              segments = url.split("/");
              key = segments[segments.length - 1];
              _context8.next = 7;
              return (0, _graphqlRequest.request)(_config.default.host + "/graphql", forgotPasswordMutation(newPassword, key));

            case 7:
              response = _context8.sent;
              console.log("res: ", response);
              expect(response).toEqual({
                forgotPasswordChange: null
              }); // TODO:

              /* const loggedIn = login(email, newPassword) */

              /* console.log("logged: ", loggedIn) */

              /* expect(await loggedIn.toEqual({token})) */

            case 10:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
  });
} catch (err) {
  console.log("err: ", err);
}