"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chalk = _interopRequireDefault(require("chalk"));

var _http = _interopRequireDefault(require("http"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _userModel = _interopRequireDefault(require("./api/user/user-model.js"));

var _server = _interopRequireDefault(require("./server.js"));

var _config = _interopRequireDefault(require("./config"));

var _graphqlServer = _interopRequireDefault(require("./graphql-server.js"));

var _auth = require("./auth");

var _socketServer = _interopRequireDefault(require("./socketio/socket-server.js"));

var server = _http.default.createServer(_server.default);

(0, _socketServer.default)(server);
var currentApp = _server.default;

_mongoose.default.set("useFindAndModify", false);

var env = process.env.NODE_ENV || "empty";
console.log(_chalk.default.yellow.bgBlue.bold("The current ENV:") + " " + _chalk.default.greenBright.bold(env));

_server.default.get("/", function (req, res, next) {
  res.send("Hi.  Your ip addresses was just recorded and put on our watchlist. Please be advised that we will be monitoring this ip addreass and logging it's activities on our server.  Enjoy the rest of your day.");
});

_server.default.get("/confirm/:id", function () {
  var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(req, res, next) {
    var id, userId;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            userId = redis.get(id);

            if (!userId) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return _userModel.default.update({
              id: userId
            }, {
              confirmed: true
            });

          case 5:
            res.send("ok");
            _context.next = 9;
            break;

          case 8:
            res.send("invalid");

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

_server.default.use(_auth.isAuth);

_graphqlServer.default.applyMiddleware({
  app: _server.default
});

server.listen(_config.default.port, function () {
  console.log(_chalk.default.white.bgMagenta.bold("listening on port ") + " " + _chalk.default.greenBright.bold(_config.default.port));
  console.log(_chalk.default.white.bgGreen.bold("GraphQL Path ") + " " + _chalk.default.greenBright.bold(_graphqlServer.default.graphqlPath));
});