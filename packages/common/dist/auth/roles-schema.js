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
  test: {
    static: ["test:create"],
    dynamic: [{
      "test:trash": function testTrash(_ref) {
        var username = _ref.username,
            courseAuthorUsername = _ref.courseAuthorUsername;

        if (!username || !courseAuthorUsername) return false;
        return username === courseAuthorUsername;
      }
    }]
  },
  registeredUser: {
    static: ["courses:create", "users:getSelf", "dashboard:read", "contact:read"],
    dynamic: [{
      "course-settings:read": function courseSettingsRead(_ref2) {
        var username = _ref2.username,
            courseAuthorUsername = _ref2.courseAuthorUsername;

        if (!username || !courseAuthorUsername) return false;
        return username === courseAuthorUsername;
      }
    }, {
      "course-introduction:update": function courseIntroductionUpdate(_ref3) {
        var username = _ref3.username,
            courseAuthorUsername = _ref3.courseAuthorUsername;

        if (!username || !courseAuthorUsername) return false;
        return username === courseAuthorUsername;
      }
    }, {
      "course-settings:delete": function courseSettingsDelete(_ref4) {
        var username = _ref4.username,
            courseAuthorUsername = _ref4.courseAuthorUsername;

        if (!username || !courseAuthorUsername) return false;
        return username === courseAuthorUsername;
      }
    }]
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