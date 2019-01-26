"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @Static scopes are those scopes which don't need any data apart from the user role. */

/* @Dynamic scopes are scopes which need additional data to determine access. */

/* Thes schema is only concerned with resources that need to be protected.  Therefore, all resources not specified here are considered public and anyone can view them.  The role "registeredUser" is given to everyone who signsup.  Protected resources have scopes in the (resource:action) format. */

/*  Use hierarchy system: Ensure that no dynamic functions have the same permission functions, otherwise if a user has that roles with same functions, they will be run with @hasScope which will make multiple database calls */

var roles = {
  guest: {
    static: ["home:read", "contact:read", "pricing:read", "login:read"]
  },
  test: {
    static: ["test:create"],
    dynamic: [{
      "test:trash": function testTrash(id, ownerId) {
        if (!id || !ownerId) return false;
        return id === ownerId;
      }
    }]
  },
  registeredUser: {
    static: ["course:read", "courses:create", "users:getSelf", "dashboard:read", "contact:read"],
    dynamic: [{
      "course:update": function courseUpdate(username, courseAuthorUsername) {
        if (!username || !courseAuthorUsername) return false;
        return username === courseAuthorUsername;
      }
    }, {
      "course:delete": function courseDelete(username, courseAuthorUsername) {
        if (!username || !courseAuthorUsername) return false;
        return username === courseAuthorUsername;
      }
    }, {
      "test:trash": function testTrash(id, ownerId) {
        console.log("id: ", typeof id === "undefined" ? "undefined" : (0, _typeof3.default)(id));
        console.log("ownerId: ", typeof ownerId === "undefined" ? "undefined" : (0, _typeof3.default)(ownerId));
        if (!id || !ownerId) return false;
        return id === ownerId;
      }
    }]
  },
  admin: {
    static: ["courses:create", "courses:update", "courses:delete", "users:get", "users:getSelf", "home:read", "dashboard:read"]
  }
};

var _default = roles;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(roles, "roles", "src/auth/roles-schema.js");
  reactHotLoader.register(_default, "default", "src/auth/roles-schema.js");
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

  reactHotLoader.register(roles, "roles", "src/auth/roles-schema.js");
  reactHotLoader.register(_default2, "default", "src/auth/roles-schema.js");
  leaveModule(module);
})();

;