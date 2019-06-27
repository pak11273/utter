"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.join_handler = void 0;
var Users = new SocketUsers();

var join_handler = function join_handler(io, socket) {
  return function (zone, cb) {
    socket.join(zone.zoneId);
    io.to(zone.zoneId).emit("usersList", Users.getUsersList(zone.zoneId));
    cb();
  };
};

exports.join_handler = join_handler;