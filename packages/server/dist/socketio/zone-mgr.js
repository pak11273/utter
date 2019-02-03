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

var _zone = require("./zone");

var _zone2 = _interopRequireDefault(_zone);

var _zones = require("./zones");

var _zones2 = _interopRequireDefault(_zones);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  // mapping of all available zones
  var zones = new Map(_zones2.default.map(function (c) {
    return [c.name, (0, _zone2.default)(c)];
  }));

  function removeClient(client) {
    zones.forEach(function (c) {
      return c.removeUser(client);
    });
  }

  function getZoneByName(zoneName) {
    return zones.get(zoneName);
  }

  function serializeZones() {
    return Array.from(zones.values()).map(function (c) {
      return c.serialize();
    });
  }

  return {
    removeClient: removeClient,
    getZoneByName: getZoneByName,
    serializeZones: serializeZones
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

  reactHotLoader.register(_default, "default", "src/socketio/zone-mgr.js");
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

  reactHotLoader.register(_default2, "default", "src/socketio/zone-mgr.js");
  leaveModule(module);
})();

;