"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _uniqBy = _interopRequireDefault(require("lodash/uniqBy"));

var SocketGlobal = function () {
  function SocketGlobal() {
    (0, _classCallCheck2["default"])(this, SocketGlobal);
    this.globalZone = [];
  }

  (0, _createClass2["default"])(SocketGlobal, [{
    key: "getUser",
    value: function getUser(id) {
      var getUser = this.globalZone.filter(function (userId) {
        return userId.user === id;
      })[0];
      return getUser;
    }
  }, {
    key: "removeUser",
    value: function removeUser(username) {
      var user = this.getUser(username);

      if (user) {
        this.users = this.globalZone.filter(function (user) {
          return user.username !== username;
        });
      }

      return user;
    }
  }, {
    key: "registerZone",
    value: function registerZone(username, avatar) {
      var zoneName = {
        username: username,
        avatar: avatar
      };
      this.globalZone.push(zoneName);
      this.globalZone = (0, _uniqBy["default"])(this.globalZone, "username");
      return zoneName;
    }
  }, {
    key: "getZoneList",
    value: function getZoneList() {
      return this.globalZone;
    }
  }]);
  return SocketGlobal;
}();

var _default = SocketGlobal;
exports["default"] = _default;