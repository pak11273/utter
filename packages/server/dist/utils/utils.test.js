"use strict";

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

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _http = require("axios/lib/adapters/http");

var _http2 = _interopRequireDefault(_http);

var _createConfirmationEmailLink = require("./create-confirmation-email-link.js");

var _userModel = require("../api/user/user-model.js");

var _userModel2 = _interopRequireDefault(_userModel);

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userId = "";
/* const redis = new Redis() */

/* import Redis from "ioredis" */
beforeAll(function () {
  jest.setTimeout(40000);

  var newUser = new _userModel2.default({
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
  it("Ensure confirms user and clears key in redis", (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var url, response, chunks, key, val;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _createConfirmationEmailLink.createEmailConfirmLink)(_config2.default.host, userId /* redis */);

          case 3:
            url = _context.sent;
            _context.next = 6;
            return _axios2.default.get(url, { adapter: _http2.default });

          case 6:
            response = _context.sent;

            expect(response).toHaveProperty("data");
            _userModel2.default.findById(userId, function (err, user) {
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
    }, _callee, undefined, [[0, 17]]);
  })));
  it("throws and error if bad key", (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _axios2.default.get(_config2.default.host + "/confirm/1234", { adapter: _http2.default });

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
    }, _callee2, undefined, [[0, 6]]);
  })));
});
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(userId, "userId", "src/utils/utils.test.js");
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

  reactHotLoader.register(userId, "userId", "src/utils/utils.test.js");
  leaveModule(module);
})();

;