"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _zone = require("./zone");

var _zone2 = _interopRequireDefault(_zone);

var _zones = require("./zones");

var _zones2 = _interopRequireDefault(_zones);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var zones, removeClient, getZoneById, serializeZones;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            serializeZones = function serializeZones() {
              return Array.from(zones.values()).map(function (c) {
                return c.serialize();
              });
            };

            getZoneById = function getZoneById(id) {
              return zones.get(id);
            };

            removeClient = function removeClient(client) {
              zones.forEach(function (c) {
                return c.removeUser(client);
              });
            };

            _context.next = 5;
            return _zones2.default.then(function (doc) {
              // 1. result is an array of zone objects
              // 2. each object will be passed to the Zone module, where zoneName and image is extracted
              return new Map(doc.map(function (c) {
                return [c.id, (0, _zone2.default)(c)];
              }));
            });

          case 5:
            zones = _context.sent;
            return _context.abrupt("return", {
              removeClient: removeClient,
              getZoneById: getZoneById,
              serializeZones: serializeZones
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function _default() {
    return _ref.apply(this, arguments);
  };
}();

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "src/socketio/zone-mgr.js");
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

  reactHotLoader.register(_default2, "default", "src/socketio/zone-mgr.js");
  leaveModule(module);
})();

;