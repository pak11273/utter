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

var _default = [{
  name: "Rick",
  lastName: "Grimes",
  statusText: "I am the leader!",
  image: "users/rick.jpg"
}, {
  name: "Daryl",
  lastName: "Dixon",
  statusText: "I like smashing Walkers.",
  image: "users/daryl.jpg"
}, {
  name: "Carol",
  lastName: "Peletier",
  statusText: "Don't mess with me!",
  image: "users/carol.jpg"
}, {
  name: "Negan",
  lastName: "",
  statusText: "In a relationship with Lucille.",
  image: "users/negan.jpeg"
}];
var _default2 = _default;
// array of objects of users

exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

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

  reactHotLoader.register(_default2, "default", "src/socketio/users.js");
  leaveModule(module);
})();

;