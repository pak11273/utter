"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register_zone_handler = void 0;

var _global = _interopRequireDefault(require("../../socketio/global.js"));

var Global = new _global["default"]();

var register_zone_handler = function register_zone_handler(io) {
  return function (global) {
    Global.registerZone(global.username, global.avatar);
    var list = Global.getZoneList();
    io.emit("loggedInUser", list);
  };
};

exports.register_zone_handler = register_zone_handler;