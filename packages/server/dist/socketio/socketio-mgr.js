"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _socket = _interopRequireDefault(require("socket.io"));

var _uniqBy = _interopRequireDefault(require("lodash/uniqBy"));

var _remove = _interopRequireDefault(require("lodash/remove"));

var _users = _interopRequireDefault(require("../socketio/users.js"));

var _global = _interopRequireDefault(require("../socketio/global.js"));

var _constants = require("./constants");

var _globalHandlers = require("./handlers/global-handlers.js");

var _user_handlers = require("./handlers/user_handlers.js");

var _userModel = _interopRequireDefault(require("../api/user/user-model.js"));

var _redis = require("../redis.js");

var Users = new _users["default"]();
var Global = new _global["default"]();

var _default = function _default(server) {
  var socket = (0, _socket["default"])(server);
  socket.on("connection", function (client) {
    console.log("a user connected");
    client.on(_constants.GLOBAL_REGISTER, (0, _globalHandlers.register_zone_handler)(socket));
    client.on(_constants.CREATE_USERZONE, (0, _user_handlers.create_userzone_handler)(_redis.redis, client));
    client.on("join", function (zone, cb) {
      client.join(zone.zoneId);
      Users.addUserData(client.id, zone.zoneId, zone.zoneName, zone.username);
      socket.to(zone.zoneId).emit("usersList", Users.getUsersList(zone.zoneId));
      cb();
    });
    client.on("leave", function (zone, cb) {
      client.leave(zone.zoneId);
      Users.removeUser(zone.username);
      socket.to(zone.zoneId).emit("usersList", Users.getUsersList(zone.zoneId));
      cb();
    });
    client.on("joinAddContact", function (zone, cb) {
      client.join(zone.username);
      cb();
    });
    client.on("sendContactRequest", function (zone) {
      socket.to(zone.contact).emit("newContactRequest", {
        from: zone.sender,
        to: zone.contact
      });
    });
    client.on("disconnect", (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log("a user disconnected");

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    client.on("disconnecting", function () {
      var rooms = Object.keys(client.rooms);
      rooms.map(function (item) {
        _redis.redis.del(item);

        _redis.redis.srem("userzones", item);
      });
      console.log("list: ", Users.getUsersList());
    });
    client.on("createMessage", function (_ref2, cb) {
      var username = _ref2.username,
          msg = _ref2.msg,
          zoneId = _ref2.zoneId;
      socket.to(zoneId).emit("newMessage", {
        username: username,
        msg: msg,
        zoneId: zoneId
      });
      cb();
    });
    client.on("register", function (_ref3) {
      var username = _ref3.username,
          cb = _ref3.cb;
      return cb(null, username);
    });
    client.on("getSocketioConnections", function (cb) {
      return cb(socket.engine.clientsCount);
    });
  });
  return socket;
};

exports["default"] = _default;