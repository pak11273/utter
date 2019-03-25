"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _socket = _interopRequireDefault(require("socket.io"));

var _path = _interopRequireDefault(require("path"));

var _socket2 = _interopRequireDefault(require("socket.io-stream"));

var _socketMgr = _interopRequireDefault(require("./socket-mgr.js"));

var _zoneMgr = _interopRequireDefault(require("./zone-mgr.js"));

var _handlers = _interopRequireDefault(require("./handlers"));

var _users = _interopRequireDefault(require("./users.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(server) {
    var io, socketManager, zoneManager, users;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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
              }); // TODO: NEW API BELOW

              socket.on("register", handleRegister);
              /* socket.on("join", handleJoin) */

              socket.on("leave", handleLeave);
              socket.on("message", handleMessage);
              socket.on("zones", handleGetZones);
              socket.on("availableUsers", handleGetAvailableUsers);
              /* socket.on("disconnect", () => { */

              /*   console.log("socket disconnect...", socket.id) */

              /*   handleDisconnect() */

              /* }) */

              socket.on("error", function (err) {
                console.log("received error from socket:", socket.id);
                console.log(err);
              });
              /* socket.on("disconnect", socket => { */

              /*   console.log("user disconnected") */

              /*   io.emit("disconnect", {status: "disconnected"}) */

              /* }) */
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