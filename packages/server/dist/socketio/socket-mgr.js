"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var userTemplates = require("./users");

var _default = function _default() {
  // mapping of all connected sockets
  var sockets = new Map();

  function addSocket(socket) {
    sockets.set(socket.id, {
      socket: socket
    });
  }

  function registerSocket(socket, user) {
    sockets.set(socket.id, {
      socket: socket,
      user: user
    });
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

exports.default = _default;