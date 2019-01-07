"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (socketio) {
  socketio.on("connection", function (socket) {
    console.log("User connected");
  });
};