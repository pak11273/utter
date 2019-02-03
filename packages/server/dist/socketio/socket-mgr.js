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

var userTemplates = require("./users");

var _default = function _default() {
  // mapping of all connected sockets
  var sockets = new Map();

  function addSocket(socket) {
    sockets.set(socket.id, { socket: socket });
  }

  function registerSocket(socket, user) {
    sockets.set(socket.id, { socket: socket, user: user });
  }

  function removeSocket(socket) {
    sockets.delete(socket.id);
  }

  function getAvailableUsers() {
    var usersTaken = new Set(Array.from(sockets.values()).filter(function (c) {
      return c.user;
    }).map(function (c) {
      return c.user.name;
    }));
    return userTemplates.filter(function (u) {
      return !usersTaken.has(u.name);
    });
  }

  function isUserAvailable(userName) {
    return getAvailableUsers().some(function (u) {
      return u.name === userName;
    });
  }

  function getUserByName(userName) {
    return userTemplates.find(function (u) {
      return u.name === userName;
    });
  }

  function getUserBySocketId(socketId) {
    return (sockets.get(socketId) || {}).user;
  }

  return {
    addSocket: addSocket,
    registerSocket: registerSocket,
    removeSocket: removeSocket,
    getAvailableUsers: getAvailableUsers,
    isUserAvailable: isUserAvailable,
    getUserByName: getUserByName,
    getUserBySocketId: getUserBySocketId
  };
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

  reactHotLoader.register(_default, "default", "src/socketio/socket-mgr.js");
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

  reactHotLoader.register(_default2, "default", "src/socketio/socket-mgr.js");
  leaveModule(module);
})();

;