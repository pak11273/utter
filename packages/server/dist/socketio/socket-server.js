"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _socket = _interopRequireDefault(require("socket.io"));

var _path = _interopRequireDefault(require("path"));

var _socket2 = _interopRequireDefault(require("socket.io-stream"));

var _socketMgr = _interopRequireDefault(require("./socket-mgr.js"));

var _zoneMgr = _interopRequireDefault(require("./zone-mgr.js"));

var _handlers = _interopRequireDefault(require("./handlers"));

var _users = _interopRequireDefault(require("./users.js"));

var _default = function () {
  var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(server) {
    var io, socketManager, zoneManager, users;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            io = (0, _socket.default)(server);
            socketManager = (0, _socketMgr.default)();
            _context.next = 4;
            return (0, _zoneMgr.default)();

          case 4:
            zoneManager = _context.sent;
            users = new _users.default();
            io.on("connection", function (socket) {
              var _makeHandlers = (0, _handlers.default)(socket, socketManager, zoneManager),
                  handleRegister = _makeHandlers.handleRegister,
                  handleJoin = _makeHandlers.handleJoin,
                  handleLeave = _makeHandlers.handleLeave,
                  handleMessage = _makeHandlers.handleMessage,
                  handleGetZones = _makeHandlers.handleGetZones,
                  handleGetAvailableUsers = _makeHandlers.handleGetAvailableUsers,
                  handleDisconnect = _makeHandlers.handleDisconnect;

              console.log("User connected to socket: " + socket.id);
              socket.on("createMessage", function (msgObj, cb) {
                if (msgObj.message.length > 255) {
                  var err = "Messages cannot be over 255 characters.";
                } else {
                  err = null;
                }

                if (err) {
                  var success = null;
                } else {
                  success = "sucess";
                }

                io.to(msgObj.zoneId).emit("newMessage", {
                  data: msgObj
                });
                cb(err, msgObj);
              });
              socket.on("join", function (zone, username, cb) {
                socket.join(zone.id);
                users.addUserData(socket.id, zone.id, zone.zoneName, username);
                io.to(zone.id).emit("usersList", users.getUsersList(zone.id));
                cb();
              });
              socket.on("disconnect", function () {
                console.log("users: ", users);
                console.log("SOCKET: ", socket.id);
                var user = users.removeUserId(socket.id);

                if (user) {
                  io.to(user.zoneId).emit("usersList", users.getUsersList(user.zoneId));
                }

                console.log("socket disconnect...", socket.id);
                handleDisconnect();
              });
              socket.on("register", handleRegister);
              socket.on("leave", handleLeave);
              socket.on("message", handleMessage);
              socket.on("zones", handleGetZones);
              socket.on("availableUsers", handleGetAvailableUsers);
              socket.on("error", function (err) {
                console.log("received error from socket:", socket.id);
                console.log(err);
              });
            });

          case 7:
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