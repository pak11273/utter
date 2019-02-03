"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _socket = require("socket.io");

var _socket2 = _interopRequireDefault(_socket);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _socket3 = require("socket.io-stream");

var _socket4 = _interopRequireDefault(_socket3);

var _socketMgr = require("./socket-mgr.js");

var _socketMgr2 = _interopRequireDefault(_socketMgr);

var _zoneMgr = require("./zone-mgr.js");

var _zoneMgr2 = _interopRequireDefault(_zoneMgr);

var _handlers = require("./handlers");

var _handlers2 = _interopRequireDefault(_handlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(server) {
  var io = (0, _socket2.default)(server);

  var socketManager = (0, _socketMgr2.default)();
  var zoneManager = (0, _zoneMgr2.default)();

  io.on("connection", function (socket) {
    var _makeHandlers = (0, _handlers2.default)(socket, socketManager, zoneManager),
        handleRegister = _makeHandlers.handleRegister,
        handleJoin = _makeHandlers.handleJoin,
        handleLeave = _makeHandlers.handleLeave,
        handleMessage = _makeHandlers.handleMessage,
        handleGetZones = _makeHandlers.handleGetZones,
        handleGetAvailableUsers = _makeHandlers.handleGetAvailableUsers,
        handleDisconnect = _makeHandlers.handleDisconnect;

    console.log("User connected to chat");

    socket.on("join", function (params, cb) {
      console.log("params: ", params);
      socket.join(params.zoneName);
      cb();
    });

    socket.on("createMessage", function (msg) {
      console.log("val: ", msg);
      io.to(msg.zoneName).emit("newMessage", {
        msg: msg.msg,
        zoneName: msg.zoneName
      });
    });

    console.log("User " + socket.id + " connected");

    socket.on("register", handleRegister);

    /* socket.on("join", handleJoin) */

    socket.on("leave", handleLeave);

    socket.on("message", handleMessage);

    socket.on("zones", handleGetZones);

    socket.on("availableUsers", handleGetAvailableUsers);

    socket.on("disconnect", function () {
      console.log("socket disconnect...", socket.id);
      handleDisconnect();
    });

    socket.on("error", function (err) {
      console.log("received error from socket:", socket.id);
      console.log(err);
    });

    socket.on("disconnect", function (socket) {
      console.log("user disconnected");
      io.emit("disconnect", { status: "disconnected" });
    });
  });
};

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "src/socketio/socket-server.js");
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

  reactHotLoader.register(_default2, "default", "src/socketio/socket-server.js");
  leaveModule(module);
})();

;