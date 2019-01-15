"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SocketIOInitialConnector = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _socketio = require("../../services/socketio");

var _socketio2 = _interopRequireDefault(_socketio);

var _normalizeErrors = require("../../utils/normalize-errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* NOTE: Since this will file will be used by both client and app, it cannot use React or React Native Commands ie. <div> <View> */

var socket = new _socketio2.default(); /* eslint no-unused-vars: 0 */

var SocketIOInitialConnector = exports.SocketIOInitialConnector = function (_PureComponent) {
  (0, _inherits3.default)(SocketIOInitialConnector, _PureComponent);

  function SocketIOInitialConnector() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SocketIOInitialConnector);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SocketIOInitialConnector.__proto__ || Object.getPrototypeOf(SocketIOInitialConnector)).call.apply(_ref, [this].concat(args))), _this), _this.connect = function () {
      return new Promise(function (resolve) {
        socket.on("connect", function () {
          resolve(socket);
        });
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SocketIOInitialConnector, [{
    key: "render",
    value: function render() {
      //TODO: redux the promise
      var socketio = this.connect().then(function (data) {
        return console.log("socket: ", socket);
      });
      return this.props.children({ submit: this.submit });
    }
  }]);
  return SocketIOInitialConnector;
}(_react.PureComponent);

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SocketIOInitialConnector, "SocketIOInitialConnector", "src/connectors/socketio/socketio-connector.js");
  reactHotLoader.register(socket, "socket", "src/connectors/socketio/socketio-connector.js");
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

  reactHotLoader.register(SocketIOInitialConnector, "SocketIOInitialConnector", "src/connectors/socketio/socketio-connector.js");
  reactHotLoader.register(socket, "socket", "src/connectors/socketio/socketio-connector.js");
  leaveModule(module);
})();

;