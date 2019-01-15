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

/* @Static scopes are those scopes which don't need any data apart from the user role. */

/* @Dynamic scopes are scopes which need additional data to determine access. */

/* Thes schema is only concerned with resources that need to be protected.  Therefore, all resources not specified here are considered public and anyone can view them.  The role "registeredUser" is given to everyone who signsup.  Protected resources have scopes in the (resource:action) format. */

var rules = {
  guest: {
    static: ["home:read", "contact:read", "pricing:read", "login:read"]
  },
  registeredUser: {
    static: ["courses:create", "users:getSelf", "dashboard:read"],
    dynamic: {
      "courses:update": function coursesUpdate(_ref) {
        var userId = _ref.userId,
            postOwnerId = _ref.postOwnerId;

        if (!userId || !postOwnerId) return false;
        return userId === postOwnerId;
      }
    }
  },
  admin: {
    static: ["courses:create", "courses:update", "courses:delete", "users:get", "users:getSelf", "home:read", "dashboard:read"]
  }
};

var _default = rules;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(rules, "rules", "src/auth/roles-schema.js");
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

  reactHotLoader.register(rules, "rules", "src/auth/roles-schema.js");
  reactHotLoader.register(_default2, "default", "src/auth/roles-schema.js");
  leaveModule(module);
})();

;