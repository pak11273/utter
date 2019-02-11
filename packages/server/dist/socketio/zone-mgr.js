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

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _zone = require("./zone");

var _zone2 = _interopRequireDefault(_zone);

var _zoneModel = require("../api/zone/zone-model");

var _zoneModel2 = _interopRequireDefault(_zoneModel);

var _zones = require("./zones");

var _zones2 = _interopRequireDefault(_zones);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    var queryDB, removeClient, getZoneById, serializeZones;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // mapping of all available zones

            queryDB = function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                var doc;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _zoneModel2.default.find({ _id: id }).limit(12).sort({ _id: -1 }).exec();

                      case 2:
                        doc = _context.sent;

                        if (!(0, _isEmpty2.default)(doc)) {
                          _context.next = 7;
                          break;
                        }

                        console.log("no zones created.");
                        _context.next = 8;
                        break;

                      case 7:
                        return _context.abrupt("return", new Map(doc.map(function (c) {
                          return [c.id, (0, _zone2.default)(c)];
                        })));

                      case 8:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function queryDB() {
                return _ref2.apply(this, arguments);
              };
            }();

            removeClient = function removeClient(client) {
              zones.forEach(function (c) {
                return c.removeUser(client);
              });
            };

            getZoneById = function () {
              var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(id) {
                var zones;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return queryDB(id);

                      case 2:
                        zones = _context2.sent;
                        return _context2.abrupt("return", zones.get(id));

                      case 4:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function getZoneById(_x2) {
                return _ref3.apply(this, arguments);
              };
            }();

            serializeZones = function () {
              var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
                var zones;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return queryDB();

                      case 2:
                        zones = _context3.sent;
                        return _context3.abrupt("return", Array.from(zones.values()).map(function (c) {
                          return c.serialize();
                        }));

                      case 4:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function serializeZones() {
                return _ref4.apply(this, arguments);
              };
            }();

            return _context4.abrupt("return", {
              removeClient: removeClient,
              getZoneById: getZoneById,
              serializeZones: serializeZones
            });

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
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