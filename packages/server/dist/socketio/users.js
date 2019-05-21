"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var SocketUsers = function () {
  function SocketUsers() {
    (0, _classCallCheck2.default)(this, SocketUsers);
    this.users = [];
  }

  (0, _createClass2.default)(SocketUsers, [{
    key: "addUserData",
    value: function addUserData(socketId, zoneId, zoneName, username) {
      var users = {
        socketId: socketId,
        zoneId: zoneId,
        zoneName: zoneName,
        username: username
      };
      this.users.push(users);
      return users;
    }
  }, {
    key: "removeUser",
    value: function removeUser(id) {
      var user = this.getUser(id);

      if (user) {
        this.users.filter(function (user) {
          return user.id !== id;
        });
      }

      return user;
    }
  }, {
    key: "getUser",
    value: function getUser(id) {
      var getUser = this.users.filter(function (userId) {
        return userId.user === id;
      })[0];
      return getUser;
    }
  }, {
    key: "removeUserId",
    value: function removeUserId(socketId) {
      var user = this.getUser(socketId);

      if (user) {
        this.users = this.users.filter(function (user) {
          return user.socketId !== socketId;
        });
        console.log("users after get him: ", this.users);
      }

      return user;
    }
  }, {
    key: "getUser",
    value: function getUser(socketId) {
      var getUser = this.users.filter(function (user) {
        return user.socketId === socketId;
      })[0];
      return getUser;
    }
  }, {
    key: "getUsersList",
    value: function getUsersList(zoneId) {
      var users = this.users.filter(function (user) {
        return user.zoneId === zoneId;
      });
      var namesArr = users.map(function (user) {
        return user.username;
      });
      return namesArr;
    }
  }]);
  return SocketUsers;
}();

var _default = SocketUsers;
exports.default = _default;