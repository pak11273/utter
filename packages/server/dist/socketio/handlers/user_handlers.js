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

var create_userzone_handler = function create_userzone_handler(redis, client) {
  return function () {
    var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2(userData, cb) {
      var user, UserContactsList, allContacts, prom;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              client.join(userData.username, function () {
                var rooms = Object.keys(client.rooms);
              });
              redis.sadd("userzones", userData.username);
              _context2.next = 5;
              return _userModel["default"].findById(userData._id).populate("contacts").lean();

            case 5:
              user = _context2.sent;
              UserContactsList = [];

              if (!(user && user.contacts)) {
                _context2.next = 13;
                break;
              }

              allContacts = user.contacts.map(function () {
                var _ref2 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(item) {
                  var username;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          UserContactsList.push(item.username);
                          _context.next = 3;
                          return redis.hgetall(item.username);

                        case 3:
                          username = _context.sent;

                          if (username.username) {
                            _context.next = 8;
                            break;
                          }

                          return _context.abrupt("return", {
                            username: item.username,
                            stat: "offline"
                          });

                        case 8:
                          return _context.abrupt("return", redis.hget(userData.username, "stat").then(function (val) {
                            return {
                              avatar: item.avatar,
                              username: item.username,
                              stat: val
                            };
                          }));

                        case 9:
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
              _context2.next = 11;
              return Promise.all(allContacts);

            case 11:
              prom = _context2.sent;
              cb(prom);

            case 13:
              redis.hmset(userData.username, {
                username: userData.username,
                contacts: UserContactsList,
                _id: userData._id,
                stat: "online"
              });
              _context2.next = 19;
              break;

            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](0);
              console.log("err: ", _context2.t0);

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 16]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports.create_userzone_handler = create_userzone_handler;