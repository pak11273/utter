"use strict";

var _axios = _interopRequireDefault(require("axios"));

var _http = _interopRequireDefault(require("axios/lib/adapters/http"));

var _createConfirmationEmailLink = require("./create-confirmation-email-link.js");

var _userModel = _interopRequireDefault(require("../api/user/user-model.js"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var userId = "";
/* const redis = new Redis() */

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
describe("Utils Tests", function () {
  it("Ensure confirms user and clears key in redis",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var url, response, chunks, key, val;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _createConfirmationEmailLink.createEmailConfirmLink)(_config.default.host, userId
            /* redis */
            );

          case 3:
            url = _context.sent;
            _context.next = 6;
            return _axios.default.get(url, {
              adapter: _http.default
            });

          case 6:
            response = _context.sent;
            expect(response).toHaveProperty("data");

            _userModel.default.findById(userId, function (err, user) {
              if (err) {
                console.log("err: ", err);
              }

              expect(user.confirmed).toBeTruthy();
            });

            chunks = url.split("/");
            key = chunks[chunks.length - 1];
            _context.next = 13;
            return redis.get(key);

          case 13:
            val = _context.sent;
            expect(val).toBeNull();
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17]]);
  })));
  it("throws and error if bad key",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _axios.default.get("".concat(_config.default.host, "/confirm/1234"), {
              adapter: _http.default
            });

          case 3:
            response = _context2.sent;
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            expect(_context2.t0.response.statusText).toEqual("Unauthorized");

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 6]]);
  })));
});