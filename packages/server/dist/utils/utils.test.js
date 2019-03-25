"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _http = _interopRequireDefault(require("axios/lib/adapters/http"));

var _createConfirmationEmailLink = require("./create-confirmation-email-link.js");

var _userModel = _interopRequireDefault(require("../api/user/user-model.js"));

var _config = _interopRequireDefault(require("../config"));

/* import Redis from "ioredis" */
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
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var url, response, chunks, key, val;
    return _regenerator.default.wrap(function _callee$(_context) {
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
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var response;
    return _regenerator.default.wrap(function _callee2$(_context2) {
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