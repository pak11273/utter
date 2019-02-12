"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Users = function () {
  function Users() {
    (0, _classCallCheck3.default)(this, Users);

    this.users = [];
  }

  (0, _createClass3.default)(Users, [{
    key: "addUserData",
    value: function addUserData(zoneId, zoneName, username) {
      var users = {
        zoneId: zoneId,
        zoneName: zoneName,
        username: username
      };
      this.users.push(users);
      return users;
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
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Users, "Users", "src/socketio/users.js");
  reactHotLoader.register(_default, "default", "src/socketio/users.js");
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

  reactHotLoader.register(Users, "Users", "src/socketio/users.js");
  reactHotLoader.register(_default2, "default", "src/socketio/users.js");
  leaveModule(module);
})();

;