"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _socket = _interopRequireDefault(require("socket.io"));

var _uniqBy = _interopRequireDefault(require("lodash/uniqBy"));

var _remove = _interopRequireDefault(require("lodash/remove"));

var _users = _interopRequireDefault(require("../socketio/users.js"));

var _global = _interopRequireDefault(require("../socketio/global.js"));

var _constants = require("./constants");

var _globalHandlers = require("./handlers/global-handlers.js");

var Users = new _users["default"]();
var Global = new _global["default"]();

var _default = function _default(server) {
  var io = (0, _socket["default"])(server);
  io.on("connection", function (socket) {
    console.log("a user connected");
    socket.on(_constants.GLOBAL_REGISTER, (0, _globalHandlers.register_zone_handler)(io));
    socket.on("create", function (zone) {
      console.log("hello zone");
      console.log("zone: ", zone);
    });
    socket.on("join", function (zone, cb) {
      socket.join(zone.zoneId);
      Users.addUserData(socket.id, zone.zoneId, zone.zoneName, zone.username);
      io.to(zone.zoneId).emit("usersList", Users.getUsersList(zone.zoneId));
      cb();
    });
    socket.on("leave", function (zone, cb) {
      socket.leave(zone.zoneId);
      Users.removeUser(zone.username);
      io.to(zone.zoneId).emit("usersList", Users.getUsersList(zone.zoneId));
      cb();
    });
    socket.on("joinAddContact", function (zone, cb) {
      socket.join(zone.username);
      cb();
    });
    socket.on("sendContactRequest", function (zone) {
      io.to(zone.contact).emit("newContactRequest", {
        from: zone.sender,
        to: zone.contact
      });
    });
    socket.on("disconnect", function () {
      console.log("a user disconnected");
      var user = Users.removeUserId(socket.id);
      var global = Global.removeUser(socket.username);

      if (user) {
        io.to(user.zoneId).emit("usersList", Users.getUsersList(user.zoneId));
      }

      if (global) {
        var globalZone = Global.getZoneList();
        console.log("globalZone: ", globalZone);
        var arr = (0, _uniqBy["default"])(globalZone, "username");
        console.log("sockert naem: ", socket.username);
        var removeUser = (0, _remove["default"])(arr, socket.username);
        console.log("remove user: ", removeUser);
        console.log("arr: ", arr);
        io.emit("loggedInUser", arr);
      }
    });
    socket.on("createMessage", function (_ref, cb) {
      var username = _ref.username,
          msg = _ref.msg,
          zoneId = _ref.zoneId;
      io.to(zoneId).emit("newMessage", {
        username: username,
        msg: msg,
        zoneId: zoneId
      });
      cb();
    });
    socket.on("register", function (_ref2) {
      var username = _ref2.username,
          cb = _ref2.cb;
      return cb(null, username);
    });
  });
  return io;
};

exports["default"] = _default;