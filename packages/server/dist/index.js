"use strict";

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _http2.default.createServer(_server2.default);
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
// TODO may remove, auth moved to auth-directive
/* app.use(decodeToken(), hydrateUser()) */

_graphqlServer2.default.applyMiddleware({
  app: _server2.default
});

server.listen(_config2.default.port, function () {
  console.log(_chalk2.default.white.bgMagenta.bold("listening on port ") + " " + _chalk2.default.greenBright.bold(_config2.default.port));
  console.log(_chalk2.default.white.bgGreen.bold("GraphQL Path ") + " " + _chalk2.default.greenBright.bold(_graphqlServer2.default.graphqlPath));
});