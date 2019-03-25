"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

function makeHandleEvent(socket, socketManager, zoneManager) {
  function ensureExists(getter, rejectionMessage) {
    return new Promise(function (resolve, reject) {
      var res = getter();
      return res ? resolve(res) : reject(rejectionMessage);
    });
  }

  function ensureValidZone(zoneId) {
    return ensureExists(function () {
      return zoneManager.getZoneById(zoneId);
    }, "invalid zone id: ".concat(zoneId));
  }

  function ensureValidZoneAndUserSelected(zoneId) {
    return Promise.all([ensureValidZone(zoneId)]).then(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          zone = _ref2[0],
          user = _ref2[1];

      return Promise.resolve({
        zone: zone,
        user: user
      });
    });
  }

  function handleEvent(zoneId, createEntry) {
    return ensureValidZoneAndUserSelected(zoneId).then(function (_ref3) {
      var zone = _ref3.zone,
          user = _ref3.user;
      // append event to zone history
      var entry = (0, _objectSpread2.default)({
        user: user
      }, createEntry());
      zone.addEntry(entry); // notify other sockets in zone

      zone.broadcastMessage((0, _objectSpread2.default)({
        zone: zoneId
      }, entry));
      return zone;
    });
  }

  return handleEvent;
}

var _default = function _default(socket, socketManager, zoneManager) {
  var handleEvent = makeHandleEvent(socket, socketManager, zoneManager);

  function handleRegister(userName, cb) {
    if (!socketManager.isUserAvailable(userName)) return cb("user is not available");
    var user = socketManager.getUserByName(userName);
    socketManager.registerSocket(socket, user);
    return cb(null, user);
  }

  function handleJoin(zoneId, cb) {
    var createEntry = function createEntry() {
      return {
        event: "has joined the zone."
      };
    };

    handleEvent(zoneId, createEntry).then(function (zone) {
      // add member to zone
      zone.addUser(socket); // send zone history to socket

      cb(null, zone.getZoneHistory());
    }).catch(cb);
  }

  function handleLeave(zoneId, cb) {
    var createEntry = function createEntry() {
      return {
        event: "left the zone."
      };
    };

    handleEvent(zoneId, createEntry).then(function (zone) {
      // remove member from zone
      zone.removeUser(socket.id);
      cb(null);
    }).catch(cb);
  }

  function handleMessage() {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        zoneId = _ref4.zoneId,
        message = _ref4.message;

    var cb = arguments.length > 1 ? arguments[1] : undefined;

    var createEntry = function createEntry() {
      return {
        message: message
      };
    };

    handleEvent(zoneId, createEntry).then(function () {
      return cb(null);
    }).catch(cb);
  }

  function handleGetZones(_, cb) {
    return cb(null, zoneManager.serializeZones());
  }

  function handleGetAvailableUsers(_, cb) {
    return cb(null, socketManager.getAvailableUsers());
  }

  function handleDisconnect() {
    // remove user profile
    socketManager.removeSocket(socket); // remove member from all zones

    socketManager.removeSocket(socket);
  }

  return {
    handleRegister: handleRegister,
    handleJoin: handleJoin,
    handleLeave: handleLeave,
    handleMessage: handleMessage,
    handleGetZones: handleGetZones,
    handleGetAvailableUsers: handleGetAvailableUsers,
    handleDisconnect: handleDisconnect
  };
};

exports.default = _default;