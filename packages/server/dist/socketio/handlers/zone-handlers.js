"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.join_handler = void 0;

var _users = _interopRequireDefault(require("../../socketio/users.js"));

var Users = new _users["default"]();

var join_handler = function join_handler(io, socket) {
  return function (zone, cb) {
    socket.join(zone.zoneId);
    Users.addUserData(socket.id, zone.zoneId, zone.zoneName, zone.username);
    io.to(zone.zoneId).emit("usersList", Users.getUsersList(zone.zoneId));
    cb();
  };
};

exports.join_handler = join_handler;