"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageConnector = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _normalizeErrors = require("../../utils/normalizeErrors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* import io from "socket.io-client" */
/* import {eventChannel} from "redux-saga" */
/* import {fork, take, call, put, cancel} from "redux-saga/effects" */
/* import { */
/*   login, */
/*   logout, */
/*   addUser, */
/*   removeUser, */
/*   newMessage, */
/*   sendMessage */
/* } from "./actions" */

/* NOTE: Since this will file will be used by both client and app, it cannot use React or React Native Commands ie. <div> <View> */
/* eslint no-unused-vars: 0 */

var MessageConnector = exports.MessageConnector = function (_PureComponent) {
  (0, _inherits3.default)(MessageConnector, _PureComponent);

  function MessageConnector() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MessageConnector);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MessageConnector.__proto__ || Object.getPrototypeOf(MessageConnector)).call.apply(_ref, [this].concat(args))), _this), _this.submit = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(values) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (!courseCreate) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", courseCreate);

              case 3:
                if (!error) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", (0, _normalizeErrors.normalizeErrors)(error));

              case 5:
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);

                console.log("err: ", _context.t0);

              case 10:
                return _context.abrupt("return", null);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[0, 7]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MessageConnector, [{
    key: "render",
    value: function render() {
      return this.props.children({ submit: this.submit });
    }
  }]);
  return MessageConnector;
}(_react.PureComponent);

/* function connect() { */
/*   const socket = io("http://localhost:3000") */
/*   return new Promise(resolve => { */
/*     socket.on("connect", () => { */
/*       resolve(socket) */
/*     }) */
/*   }) */
/* } */

/* function subscribe(socket) { */
/*   return eventChannel(emit => { */
/*     socket.on("users.login", ({username}) => { */
/*       emit(addUser({username})) */
/*     }) */
/*     socket.on("users.logout", ({username}) => { */
/*       emit(removeUser({username})) */
/*     }) */
/*     socket.on("messages.new", ({message}) => { */
/*       emit(newMessage({message})) */
/*     }) */
/*     socket.on("disconnect", e => { */
/*       // TODO: handle */
/*     }) */
/*     return () => {} */
/*   }) */
/* } */

/* function* read(socket) { */
/*   const channel = yield call(subscribe, socket) */
/*   while (true) { */
/*     let action = yield take(channel) */
/*     yield put(action) */
/*   } */
/* } */

/* function* write(socket) { */
/*   while (true) { */
/*     const {payload} = yield take(`${sendMessage}`) */
/*     socket.emit("message", payload) */
/*   } */
/* } */

/* function* handleIO(socket) { */
/*   yield fork(read, socket) */
/*   yield fork(write, socket) */
/* } */

/* function* flow() { */
/*   while (true) { */
/*     let {payload} = yield take(`${login}`) */
/*     const socket = yield call(connect) */
/*     socket.emit("login", {username: payload.username}) */

/*     const task = yield fork(handleIO, socket) */

/*     let action = yield take(`${logout}`) */
/*     yield cancel(task) */
/*     socket.emit("logout") */
/*   } */
/* } */

/* export default function* rootSaga() { */
/*   yield fork(flow) */
/* } */


;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(MessageConnector, "MessageConnector", "src/connectors/socketio/message-connector.js");
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

  reactHotLoader.register(MessageConnector, "MessageConnector", "src/connectors/socketio/message-connector.js");
  leaveModule(module);
})();

;