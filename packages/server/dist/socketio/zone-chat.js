"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (socketio) {
  socketio.on("connection", function (socket) {
    console.log("User connected");

    socket.on("createMessage", function (data) {
      console.log("val: ", data);
    });
  });
};