"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SocketIOInitialConnector = undefined;

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

/* NOTE: Since this will file will be used by both client and app, it cannot use React or React Native Commands ie. <div> <View> */
/* eslint no-unused-vars: 0 */

var SocketIOInitialConnector = exports.SocketIOInitialConnector = function (_PureComponent) {
  (0, _inherits3.default)(SocketIOInitialConnector, _PureComponent);

  function SocketIOInitialConnector() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SocketIOInitialConnector);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SocketIOInitialConnector.__proto__ || Object.getPrototypeOf(SocketIOInitialConnector)).call.apply(_ref, [this].concat(args))), _this), _this.connect = function () {
      /* const socket = SocketIO("http://localhost:3000") */
      return new Promise(function (resolve) {
        socket.on("connect", function () {
          resolve(socket);
        });
      });
    }, _this.submit = function () {
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
  /* socket.on('news', function (data) { */
  /* console.log(data); */
  /* socket.emit('my other event', { my: 'data' }); */
  /* }); */

  /* socketio.emit("createMessage", { */
  /* 	text: "wtf homie foo" */
  /* }) */

  (0, _createClass3.default)(SocketIOInitialConnector, [{
    key: "render",
    value: function render() {
      /* const socketio = this.connect() */
      return this.props.children({ submit: this.submit });
    }
  }]);
  return SocketIOInitialConnector;
}(_react.PureComponent);
/* import {SocketIO} from "../../services/socketio" */


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