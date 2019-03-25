"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Users =
/*#__PURE__*/
function () {
  function Users() {
    _classCallCheck(this, Users);

    this.users = [];
  }

  _createClass(Users, [{
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

  return Users;
}();

var _default = Users;
exports.default = _default;