"use strict";

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _server = require("./server.js");

var _server2 = _interopRequireDefault(_server);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _graphqlServer = require("./graphql-server.js");

var _graphqlServer2 = _interopRequireDefault(_graphqlServer);

var _auth = require("./auth");

var _socketServer = require("./socketio/socket-server.js");

var _socketServer2 = _interopRequireDefault(_socketServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _http2.default.createServer(_server2.default);

// socketio instance
(0, _socketServer2.default)(server);

var currentApp = _server2.default;

_mongoose2.default.set("useFindAndModify", false); // removes deprecation warning
// Routers
_mongoose2.default.connection.on("connected", function () {
  // mounts
});

var env = process.env.NODE_ENV || "empty";
console.log(_chalk2.default.yellow.bgBlue.bold("The current ENV:") + " " + _chalk2.default.greenBright.bold(env));

_server2.default.get("/", function (req, res, next) {
  res.send("Hello World");
});

// Auth Middleware
// TODO may remove, we are using auth-directive too
_server2.default.use(_auth.isAuth);

_graphqlServer2.default.applyMiddleware({
  app: _server2.default
});

server.listen(_config2.default.port, function () {
  console.log(_chalk2.default.white.bgMagenta.bold("listening on port ") + " " + _chalk2.default.greenBright.bold(_config2.default.port));
  console.log(_chalk2.default.white.bgGreen.bold("GraphQL Path ") + " " + _chalk2.default.greenBright.bold(_graphqlServer2.default.graphqlPath));
});
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(server, "server", "src/index.js");
  reactHotLoader.register(currentApp, "currentApp", "src/index.js");
  reactHotLoader.register(env, "env", "src/index.js");
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

  reactHotLoader.register(server, "server", "src/index.js");
  reactHotLoader.register(currentApp, "currentApp", "src/index.js");
  reactHotLoader.register(env, "env", "src/index.js");
  leaveModule(module);
})();

;