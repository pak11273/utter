"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _socket = require("socket.io");

var _socket2 = _interopRequireDefault(_socket);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _socket3 = require("socket.io-stream");

var _socket4 = _interopRequireDefault(_socket3);

var _socketMgr = require("./socket-mgr.js");

var _socketMgr2 = _interopRequireDefault(_socketMgr);

var _zoneMgr = require("./zone-mgr.js");

var _zoneMgr2 = _interopRequireDefault(_zoneMgr);

var _handlers = require("./handlers");

var _handlers2 = _interopRequireDefault(_handlers);

var _users = require("./users.js");

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(server) {
    var io, socketManager, zoneManager, users;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            io = (0, _socket2.default)(server);
            socketManager = (0, _socketMgr2.default)();
            _context.next = 4;
            return (0, _zoneMgr2.default)();

          case 4:
            zoneManager = _context.sent;
            users = new _users2.default();


            io.on("connection", function (socket) {
              var _makeHandlers = (0, _handlers2.default)(socket, socketManager, zoneManager),
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
                users.addUserData(zone.id, zone.zoneName, username);
                io.to(zone.id).emit('usersList', users.getUsersList(zone.id));

                cb();
              });

              // TODO: NEW API BELOW

              socket.on("register", handleRegister);

              /* socket.on("join", handleJoin) */

              socket.on("leave", handleLeave);

              socket.on("message", handleMessage);

              socket.on("zones", handleGetZones);

              socket.on("availableUsers", handleGetAvailableUsers);

              socket.on("disconnect", function () {
                console.log("socket disconnect...", socket.id);
                handleDisconnect();
              });

              socket.on("error", function (err) {
                console.log("received error from socket:", socket.id);
                console.log(err);
              });

              socket.on("disconnect", function (socket) {
                console.log("user disconnected");
                io.emit("disconnect", { status: "disconnected" });
              });
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function _default(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "src/socketio/socket-server.js");
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

  reactHotLoader.register(_default2, "default", "src/socketio/socket-server.js");
  leaveModule(module);
})();

;