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

var _lodash = require("lodash");

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _zoneModel = require("../api/zone/zone-model");

var _zoneModel2 = _interopRequireDefault(_zoneModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var result = _zoneModel2.default.find({});

var _default = result;
var _default2 = _default;
exports.default = _default2;

/* export default [ */
/*   { */
/*     name: "Terminus", */
/*     image: "chatrooms/terminus.jpg" */
/*   }, */
/*   { */
/*     name: "Alexandria", */
/*     image: "chatrooms/alexandria.jpg" */
/*   }, */
/*   { */
/*     name: "Sanctuary", */
/*     image: "chatrooms/sanctuary.jpg" */
/*   }, */
/*   { */
/*     name: "Hilltop", */
/*     image: "chatrooms/hilltop.jpg" */
/*   } */
/* ] */

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(result, "result", "src/socketio/zones.js");
  reactHotLoader.register(_default, "default", "src/socketio/zones.js");
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

  reactHotLoader.register(result, "result", "src/socketio/zones.js");
  reactHotLoader.register(_default2, "default", "src/socketio/zones.js");
  leaveModule(module);
})();

;