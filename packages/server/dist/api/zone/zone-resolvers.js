"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zoneResolvers = undefined;

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _lodash = require("lodash");

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _zoneModel = require("./zone-model");

var _zoneModel2 = _interopRequireDefault(_zoneModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var escapeRegex = function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

var getZone = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_, _ref2, _ref3) {
    var zoneId = _ref2.zoneId;
    var user = _ref3.user;
    var zone;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("zoneId: ", zoneId);
            _context.next = 3;
            return _zoneModel2.default.findById(zoneId).exec();

          case 3:
            zone = _context.sent;

            if (zone) {
              _context.next = 6;
              break;
            }

            throw new Error("Cannot find zone with id");

          case 6:
            return _context.abrupt("return", zone);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getZone(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var zoneDelete = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_, _ref5, ctx) {
    var id = _ref5.id;
    var zone;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("id: ", id);
            _context2.next = 3;
            return _zoneModel2.default.findById(id).exec();

          case 3:
            zone = _context2.sent;

            if (zone) {
              _context2.next = 6;
              break;
            }

            throw new Error("No zone found.");

          case 6:

            if (zone.owner === id) {
              // TODO: delete zone
            }

            return _context2.abrupt("return", zone);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function zoneDelete(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var zoneUpdate = function zoneUpdate(_, _ref6) {
  var input = _ref6.input;
  var id = input.id,
      update = (0, _objectWithoutProperties3.default)(input, ["id"]);

  return _zoneModel2.default.findByIdAndUpdate(id, update, { new: true }).exec();
};

var zoneCreate = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_, args, ctx, info) {
    var input, zone;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            //TODO can't have duplicate zone names
            input = args.input;

            console.log("ingput: ", input);
            _context3.next = 4;
            return _zoneModel2.default.create(input);

          case 4:
            zone = _context3.sent;

            zone.id = zone._id;
            return _context3.abrupt("return", zone);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function zoneCreate(_x7, _x8, _x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();

var getZoneLevels = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_, args, ctx, info) {
    var query;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // build query object
            query = {};

            query.owner = ctx.user;

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getZoneLevels(_x11, _x12, _x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();

var getZones = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_, args, ctx, info) {
    var query, zoneName, zoneRef, owner, usingLang, teachingLang, app, appLevel, cursor, result;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log("args: ", args);
            // build query object
            query = {};


            args.title ? query.zoneName = new RegExp(escapeRegex(args.title), "gi") : null;

            args.ref ? query.zoneRef = new RegExp(escapeRegex(args.ref), "gi") : null;

            if (!args.owner) {
              _context5.next = 8;
              break;
            }

            _context5.next = 7;
            return _zoneModel2.default.findByUsername(args.owner, function (err, docs) {
              if (err) {
                // console.log doesn't work here
              }
              if (!(0, _lodash.isEmpty)(docs)) {
                var owner = docs._id;
                query.owner = owner;
              }
            });

          case 7:
            owner = _context5.sent;

          case 8:

            args.usingLang ? query.usingLang = new RegExp(escapeRegex(args.usingLang), "gi") : null;

            args.teachingLang ? query.teachingLang = new RegExp(escapeRegex(args.teachingLang), "gi") : null;
            // end query object

            console.log("query: ", query);
            if (args.cursor) {
              // type cast id, $lt is not the same in aggregate vs query
              cursor = _mongoose2.default.Types.ObjectId(args.cursor);
              // add to query object

              query._id = { $lt: cursor };
            }

            _context5.next = 14;
            return _zoneModel2.default.find(query).limit(12).sort({ _id: -1 }).exec();

          case 14:
            result = _context5.sent;

            if (!(0, _lodash.isEmpty)(result)) {
              _context5.next = 20;
              break;
            }

            console.log("done");
            return _context5.abrupt("return", { zones: [], cursor: "done" });

          case 20:
            cursor = result[result.length - 1]._id;
            return _context5.abrupt("return", { zones: result, cursor: cursor });

          case 22:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function getZones(_x15, _x16, _x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

var zoneResolvers = exports.zoneResolvers = {
  Query: {
    getZones: getZones,
    getZone: getZone,
    getZoneLevels: getZoneLevels
  },
  Mutation: {
    zoneDelete: zoneDelete,
    zoneUpdate: zoneUpdate,
    zoneCreate: zoneCreate
  },
  Zone: {
    owner: function owner(zone) {
      var _this = this;

      return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        var populated;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return zone.populate("owner").execPopulate();

              case 2:
                populated = _context6.sent;
                return _context6.abrupt("return", populated.owner);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, _this);
      }))();
    }
  }
};
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(zoneResolvers, "zoneResolvers", "src/api/zone/zone-resolvers.js");
  reactHotLoader.register(escapeRegex, "escapeRegex", "src/api/zone/zone-resolvers.js");
  reactHotLoader.register(getZone, "getZone", "src/api/zone/zone-resolvers.js");
  reactHotLoader.register(zoneDelete, "zoneDelete", "src/api/zone/zone-resolvers.js");
  reactHotLoader.register(zoneUpdate, "zoneUpdate", "src/api/zone/zone-resolvers.js");
  reactHotLoader.register(zoneCreate, "zoneCreate", "src/api/zone/zone-resolvers.js");
  reactHotLoader.register(getZoneLevels, "getZoneLevels", "src/api/zone/zone-resolvers.js");
  reactHotLoader.register(getZones, "getZones", "src/api/zone/zone-resolvers.js");
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

  reactHotLoader.register(zoneResolvers, "zoneResolvers", "src/api/zone/zone-resolvers.js");
  reactHotLoader.register(escapeRegex, "escapeRegex", "src/api/zone/zone-resolvers.js");
  reactHotLoader.register(getZone, "getZone", "src/api/zone/zone-resolvers.js");
  reactHotLoader.register(zoneDelete, "zoneDelete", "src/api/zone/zone-resolvers.js");
  reactHotLoader.register(zoneUpdate, "zoneUpdate", "src/api/zone/zone-resolvers.js");
  reactHotLoader.register(zoneCreate, "zoneCreate", "src/api/zone/zone-resolvers.js");
  reactHotLoader.register(getZoneLevels, "getZoneLevels", "src/api/zone/zone-resolvers.js");
  reactHotLoader.register(getZones, "getZones", "src/api/zone/zone-resolvers.js");
  leaveModule(module);
})();

;