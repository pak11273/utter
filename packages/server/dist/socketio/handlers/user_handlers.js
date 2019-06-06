"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add_contact_handler = void 0;

var add_contact_handler = function add_contact_handler(socket) {
  return function (zone, cb) {
    socket.join(zone.username);
    cb();
  };
};

exports.add_contact_handler = add_contact_handler;