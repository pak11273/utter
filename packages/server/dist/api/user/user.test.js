"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ioredis = _interopRequireDefault(require("ioredis"));

var _graphqlRequest = require("graphql-request");

var _chalk = _interopRequireDefault(require("chalk"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _common = require("@utterzone/common");

var _createConfirmEmailLink = require("../../utils/create-confirm-email-link");

var _errorMessages = require("../shared/error-messages.js");

var _userModel = _interopRequireDefault(require("./user-model.js"));

var _config = _interopRequireDefault(require("../../config"));

afterAll(function () {
  _mongoose["default"].disconnect();
});
var userId = "";
var redis = new _ioredis["default"]();
beforeAll(function () {
  jest.setTimeout(40000);
  var newUser = new _userModel["default"]({
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
  describe("Signup User", (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee4() {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            it("check for duplicate emails", (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee() {
              var response, dupe;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return (0, _graphqlRequest.request)(_config["default"].host + "/graphql", signupMutation(username, email, password));

                    case 2:
                      response = _context.sent;
                      expect(response.signup.token).toBeDefined();
                      _context.next = 6;
                      return (0, _graphqlRequest.request)(_config["default"].host + "/graphql", signupMutation(username, email, password));

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
            it("check for bad emails", (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2() {
              var emailCheck;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return (0, _graphqlRequest.request)(_config["default"].host + "/graphql", signupMutation("frankie", "x", password));

                    case 2:
                      emailCheck = _context2.sent;
                      expect(emailCheck.signup.token).toBeNull();

                    case 4:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            })));
            it("validate passwords", (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3() {
              return _regenerator["default"].wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3);
            })));

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  describe("Login User", (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee7() {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            it("invalid identifier login", (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee5() {
              var response;
              return _regenerator["default"].wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return (0, _graphqlRequest.request)(_config["default"].host + "/graphql", loginMutation("someUser", password));

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
            it("email not confirmed", (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee6() {
              return _regenerator["default"].wrap(function _callee6$(_context6) {
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
    it("ensures it works", (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee8() {
      var url, segments, key, response;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return (0, _createConfirmEmailLink.createEmailConfirmLink)("", userId);

            case 2:
              url = _context8.sent;
              segments = url.split("/");
              key = segments[segments.length - 1];
              _context8.next = 7;
              return (0, _graphqlRequest.request)(_config["default"].host + "/graphql", forgotPasswordMutation(newPassword, key));

            case 7:
              response = _context8.sent;
              console.log("res: ", response);
              expect(response).toEqual({
                forgotPasswordChange: null
              });

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