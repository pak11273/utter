"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _socket = _interopRequireDefault(require("socket.io"));

var _users = _interopRequireDefault(require("../socketio/users.js"));

var Users = new _users.default();

var handleEvent = function handleEvent(zoneId, createEntry) {
  var entry = (0, _objectSpread2.default)({
    user: user
  }, createEntry());
  zone.addEntry(entry);
  zone.broadcastMessage((0, _objectSpread2.default)({
    chat: zoneId
  }, entry));
  return zone;
};

var _default = function () {
  var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(server) {
    var io;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            io = (0, _socket.default)(server);
            io.on("connection", function (socket) {
              console.log("user connected");
              socket.on("join", function (zone, cb) {
                socket.join(zone.zoneId);
                console.log("zone: ", zone);
                Users.addUserData(socket.id, zone.zoneId, zone.zoneName, zone.username);
                console.log("Users: ", Users);
                io.to(zone.zoneId).emit("usersList", Users.getUsersList(zone.zoneId));
                cb();
              });
              socket.on("joinContactRequest", function (zone, cb) {
                socket.join(zone.zoneId);
                cb();
              });
              socket.on("sendContactRequest", function (zone, cb) {
                io.to(zone.contact).emit("newContactRequest", {
                  from: zone.sender,
                  to: zone.contact
                });
                cb();
              });
              socket.on("disconnect", function () {
                var user = Users.removeUserId(socket.id);

                if (user) {
                  io.to(user.zoneId).emit("usersList", Users.getUsersList(user.zoneId));
                }
              });
              socket.on("createMessage", function (_ref2, cb) {
                var username = _ref2.username,
                    msg = _ref2.msg,
                    zoneId = _ref2.zoneId;
                io.to(zoneId).emit("newMessage", {
                  username: username,
                  msg: msg,
                  zoneId: zoneId
                });
                cb();
              });
              socket.on("register", function (_ref3) {
                var username = _ref3.username,
                    cb = _ref3.cb;
                return cb(null, username);
              });
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;