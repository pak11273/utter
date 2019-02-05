"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeHandleEvent(socket, socketManager, zoneManager) {
  function ensureExists(getter, rejectionMessage) {
    return new Promise(function (resolve, reject) {
      var res = getter();
      return res ? resolve(res) : reject(rejectionMessage);
    });
  }

  function ensureUserSelected(socketId) {
    return ensureExists(function () {
      return socketManager.getUserBySocketId(socketId);
    }, "select user first");
  }

  function ensureValidZone(zoneName) {
    return ensureExists(function () {
      return zoneManager.getZoneByName(zoneName);
    }, "invalid zone name: " + zoneName);
  }

  function ensureValidZoneAndUserSelected(zoneName) {
    return Promise.all([ensureValidZone(zoneName), ensureUserSelected(socket.id)]).then(function (_ref) {
      var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
          zone = _ref2[0],
          user = _ref2[1];

      return Promise.resolve({ zone: zone, user: user });
    });
  }

  function handleEvent(zoneName, createEntry) {
    return ensureValidZoneAndUserSelected(zoneName).then(function (_ref3) {
      var zone = _ref3.zone,
          user = _ref3.user;

      // append event to zone history
      var entry = (0, _extends3.default)({ user: user }, createEntry());
      zone.addEntry(entry);

      // notify other sockets in zone
      zone.broadcastMessage((0, _extends3.default)({ zone: zoneName }, entry));
      return zone;
    });
  }

  return handleEvent;
}

var _default = function _default(socket, socketManager, zoneManager) {
  var handleEvent = makeHandleEvent(socket, socketManager, zoneManager);

  function handleRegister(userName, callback) {
    if (!socketManager.isUserAvailable(userName)) return callback("user is not available");

    var user = socketManager.getUserByName(userName);
    socketManager.registerSocket(socket, user);

    return callback(null, user);
  }

  function handleJoin(zoneName, callback) {
    var createEntry = function createEntry() {
      return { event: "joined " + zoneName };
    };

    handleEvent(zoneName, createEntry).then(function (zone) {
      // add member to zone
      zone.addUser(socket);

      // send zone history to socket
      callback(null, zone.getZoneHistory());
    }).catch(callback);
  }

  function handleLeave(zoneName, callback) {
    var createEntry = function createEntry() {
      return { event: "left " + zoneName };
    };

    handleEvent(zoneName, createEntry).then(function (zone) {
      // remove member from zone
      zone.removeUser(socket.id);

      callback(null);
    }).catch(callback);
  }

  function handleMessage() {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        zoneName = _ref4.zoneName,
        message = _ref4.message;

    var callback = arguments[1];

    var createEntry = function createEntry() {
      return { message: message };
    };

    handleEvent(zoneName, createEntry).then(function () {
      return callback(null);
    }).catch(callback);
  }

  function handleGetZones(_, callback) {
    return callback(null, zoneManager.serializeZones());
  }

  function handleGetAvailableUsers(_, callback) {
    return callback(null, socketManager.getAvailableUsers());
  }

  function handleDisconnect() {
    // remove user profile
    socketManager.removeSocket(socket);
    // remove member from all zones
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

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(makeHandleEvent, "makeHandleEvent", "src/socketio/handlers.js");
  reactHotLoader.register(_default, "default", "src/socketio/handlers.js");
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

  reactHotLoader.register(makeHandleEvent, "makeHandleEvent", "src/socketio/handlers.js");
  reactHotLoader.register(_default2, "default", "src/socketio/handlers.js");
  leaveModule(module);
})();

;