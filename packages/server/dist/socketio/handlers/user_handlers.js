"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create_userzone_handler = exports.add_contact_handler = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _userModel = _interopRequireDefault(require("../../api/user/user-model.js"));

var add_contact_handler = function add_contact_handler(socket) {
  return function (zone, cb) {
    socket.join(zone.username);
    cb();
  };
};

exports.add_contact_handler = add_contact_handler;

var create_userzone_handler = function create_userzone_handler(redis, client, socket) {
  return function () {
    var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2(userData, cb) {
      var user, UserContactsList, allContacts;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              client.join(userData.username, function () {
                var rooms = Object.keys(client.rooms);
              });
              redis.sadd("USERZONES", userData.username);
              _context2.next = 5;
              return _userModel["default"].findById(userData._id).populate("contacts").lean();

            case 5:
              user = _context2.sent;
              UserContactsList = [];

              if (user && user.contacts) {
                allContacts = user.contacts.map(function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(item) {
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (redis.exists(item.username)) {
                              client.join(item.username);
                              socket.of("/")["in"](item.username).clients(function (err, clients) {
                                console.log("clients of ; " + item.username, clients);
                              });
                            }

                          case 1:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x3) {
                    return _ref2.apply(this, arguments);
                  };
                }());
              }

              redis.hmset(userData.username, {
                username: userData.username,
                contacts: UserContactsList,
                _id: userData._id,
                stat: user.stat
              });
              _context2.next = 14;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](0);
              console.log("err: ", _context2.t0);

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 11]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports.create_userzone_handler = create_userzone_handler;