"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SocketIOInitialConnector = undefined;

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

var _normalizeErrors = require("../../utils/normalize-errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* NOTE: Since this will file will be used by both client and app, it cannot use React or React Native Commands ie. <div> <View> */

/* const socket = new SocketIOInstance() */

/* eslint no-unused-vars: 0 */

var SocketIOInitialConnector = exports.SocketIOInitialConnector = function SocketIOInitialConnector() {
  /* connect = () => { */
  /*   return new Promise(resolve => { */
  /*     socket.on("connect", () => { */
  /*       resolve(socket) */
  /*     }) */
  /*   }) */
  /* } */

  /* render() { */
  return undefined.props.children({ submit: undefined.submit });
  /* const socketio = this.connect().then(data => */
  /*   console.log("socket: ", socket) */
  /* ) */
  /* } */
};
/* import SocketIOInstance from "../../services/socketio" */
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SocketIOInitialConnector, "SocketIOInitialConnector", "src/connectors/socketio/socketio-connector.js");
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
  leaveModule(module);
})();

;