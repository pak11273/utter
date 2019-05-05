"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chalk = _interopRequireDefault(require("chalk"));

var _http = _interopRequireDefault(require("http"));

var _mongoose = _interopRequireDefault(require("mongoose"));

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

_server.default.use(_auth.isAuth);

_graphqlServer.default.applyMiddleware({
  app: _server.default
});

server.listen(_config.default.port, function () {
  console.log(_chalk.default.white.bgMagenta.bold("listening on port ") + " " + _chalk.default.greenBright.bold(_config.default.port));
  console.log(_chalk.default.white.bgGreen.bold("GraphQL Path ") + " " + _chalk.default.greenBright.bold(_graphqlServer.default.graphqlPath));
});