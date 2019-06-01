"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var SocketGlobal = function () {
  function SocketGlobal() {
    (0, _classCallCheck2.default)(this, SocketGlobal);
    this.globalZone = [];
  }

  (0, _createClass2.default)(SocketGlobal, [{
    key: "registerZone",
    value: function registerZone(socketId, username, zone, avatar) {
      var zoneName = {
        socketId: socketId,
        username: username,
        zone: zone,
        avatar: avatar
      };
      this.globalZone.push(zoneName);
      return zoneName;
    }
  }, {
    key: "getZoneList",
    value: function getZoneList(zoneId) {
      var zoneName = this.globalZone.filter(function (user) {
        return user.zoneId === zoneId;
      });
      var namesArr = zoneName.map(function (user) {
        return {
          username: user.username,
          avatar: user.avatar
        };
      });
      return namesArr;
    }
  }]);
  return SocketGlobal;
}();

var _default = SocketGlobal;
exports.default = _default;