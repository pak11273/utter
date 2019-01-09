"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _socket = require("socket.io-client");

var _socket2 = _interopRequireDefault(_socket);

var _store = require("../../../../client/src/store.js");

var _actions = require("../../../../client/src/services/socketio/actions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Socket = function () {
  function Socket() {
    (0, _classCallCheck3.default)(this, Socket);

    this.opts = { autoUpgrade: false, peerOpts: { numClients: 10 } };
  }

  (0, _createClass3.default)(Socket, [{
    key: "connect",
    value: function connect() {
      var _this = this;

      if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod") {
        this.socket = _socket2.default.connect(process.env.SOCKETIO_SERVER_URL);
      } else {
        this.socket = _socket2.default.connect("http://192.168.68.8:3010");
      }

      /* return new Promise((resolve, reject) => { */
      /*   /1* this.socket.on("connection", nsp => { *1/ */
      /*   this.socket.on("connect", nsp => { */
      /*     // return state of socket in redux */
      /*     console.log("hello foo", nsp) */
      /*     resolve(nsp) */
      /*   }) */
      /*   this.socket.on("connect_error", error => reject(error)) */
      /* }) */

      return this.socket.on("connect", function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(nsp) {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return nsp;

                case 2:
                  console.log("hello foo", nsp);

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());

      /* this.socket.on("connect_error", error => reject(error)) */
      /* }) */
    }
  }, {
    key: "nspConnect",
    value: function nspConnect(namespace) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.nsp = (0, _socket2.default)("/" + namespace);
        _this2.nsp.on("connection", function (nsp) {
          // return state of socket in redux
          resolve({ nsp: nsp });
        });

        _this2.nsp.on("connect_error", function (error) {
          return reject(error);
        });

        _this2.nsp.on("receive audio blob", function (blob) {
          _store.store.dispatch((0, _actions.receiveAudioBlob)(blob));
        });

        _this2.nsp.on("receive room meta", function (meta) {
          _store.store.dispatch((0, _actions.receiveRoomMeta)(meta));
        });

        _this2.nsp.on("receive msg", function (msg) {
          _store.store.dispatch((0, _actions.receiveMsg)(msg));
        });
      });
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3.socket.disconnect(function () {
          _this3.socket.on("disconnect", function () {
            resolve();
          });
        });
      });
    }
  }, {
    key: "emit",
    value: function emit(event, data) {
      var _this4 = this;

      return new Promise(function (resolve) {
        /* if (!this.nsp || !this.socket) return reject("No socket connection") */

        if (_this4.nsp) {
          console.log("nah");
          return _this4.nsp.emit(event, data, function (response) {
            if (response.error) {
              console.error(response.error);
              return response.error;
            }
            return resolve(response);
          });
        }
        if (_this4.socket) {
          console.log("wtf");
          return _this4.socket.emit(event, data, function (response) {
            if (response.error) {
              console.error(response.error);
              return response.error;
            }
            return resolve(response);
          });
        }
      });
    }
  }, {
    key: "on",
    value: function on(event, data) {
      var _this5 = this;

      return new Promise(function (resolve) {
        if (_this5.nsp) {
          _this5.nsp.on(event, data);
          resolve(data);
        } else if (_this5.socket) {
          _this5.socket.on(event, data);
          resolve();
        }
      });
    }

    // on(event, fun) {
    //   // No promise is needed here, but we're expecting one in the middleware.
    //   return new Promise((resolve, reject) => {
    //     if (!this.socket) return reject('No socket connection.')

    //     this.socket.on(event, fun)
    //     resolve()
    //   })
    // }

  }]);
  return Socket;
}();

var _default = Socket;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Socket, "Socket", "src/services/socketio/index.js");
  reactHotLoader.register(_default, "default", "src/services/socketio/index.js");
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

  reactHotLoader.register(Socket, "Socket", "src/services/socketio/index.js");
  reactHotLoader.register(_default2, "default", "src/services/socketio/index.js");
  leaveModule(module);
})();

;