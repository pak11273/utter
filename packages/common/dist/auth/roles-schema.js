"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var matchID = function matchID(id, matchingID) {
  if (!id || !matchingID) return false;
  return id === matchingID;
};

var roles = {
  guest: {
    "static": [""]
  },
  test: {
    "static": [""],
    dynamic: [{
      "test:read": function testRead(id, matchingID) {
        if (!id || !matchingID) return false;
        return id === matchingID;
      }
    }, {
      "test:trash": function testTrash(id, matchingID) {
        if (!id || !matchingID) return false;
        return id === matchingID;
      }
    }]
  },
  registeredUser: {
    "static": [""],
    dynamic: [{
      "course:read-settings": matchID
    }, {
      "course:update-introduction": matchID
    }, {
      "course:update-levels": matchID
    }, {
      "course:update-vocabulary": matchID
    }, {
      "course:delete": matchID
    }, {
      "zone:delete": matchID
    }]
  },
  uzAdmin: {
    "static": [""],
    dynamic: [{
      "admin:read-settings": matchID
    }, {
      "admin:delete": matchID
    }]
  },
  payMonthly: {
    "static": [{
      "account:pay-monthly": matchID
    }]
  },
  admin: {
    "static": [{
      "admin:test": matchID
    }]
  },
  superAdmin: {
    "static": [""]
  }
};
var _default = roles;
exports["default"] = _default;