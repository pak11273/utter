"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zoneResolvers = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _zoneModel = _interopRequireDefault(require("./zone-model"));

var escapeRegex = function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

var getZone =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_, _ref, _ref2) {
    var zoneId, user, zone;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            zoneId = _ref.zoneId;
            user = _ref2.user;
            _context.next = 4;
            return _zoneModel.default.findById(zoneId).exec();

          case 4:
            zone = _context.sent;

            if (zone) {
              _context.next = 7;
              break;
            }

            throw new Error("Cannot find zone with id");

          case 7:
            return _context.abrupt("return", zone);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getZone(_x, _x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

var zoneDelete =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(_, _ref4, ctx) {
    var id, zone;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = _ref4.id;
            _context2.next = 3;
            return _zoneModel.default.findById(id).exec();

          case 3:
            zone = _context2.sent;

            if (zone) {
              _context2.next = 6;
              break;
            }

            throw new Error("No zone found.");

          case 6:
            if (zone.owner === id) {// TODO: delete zone
            }

            return _context2.abrupt("return", zone);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function zoneDelete(_x4, _x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();

var zoneUpdate = function zoneUpdate(_, _ref6) {
  var input = _ref6.input;
  var id = input.id,
      update = (0, _objectWithoutProperties2.default)(input, ["id"]);
  return _zoneModel.default.findByIdAndUpdate(id, update, {
    new: true
  }).exec();
};

var zoneCreate =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(_, args, ctx, info) {
    var input, zone;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            //TODO can't have duplicate zone names
            input = args.input;
            console.log("ingput: ", input);
            _context3.next = 4;
            return _zoneModel.default.create(input);

          case 4:
            zone = _context3.sent;
            zone.id = zone._id;
            return _context3.abrupt("return", zone);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function zoneCreate(_x7, _x8, _x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();

var getZoneLevels =
/*#__PURE__*/
function () {
  var _ref8 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(_, args, ctx, info) {
    var query;
    return _regenerator.default.wrap(function _callee4$(_context4) {
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
    }, _callee4);
  }));

  return function getZoneLevels(_x11, _x12, _x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();

var getZones =
/*#__PURE__*/
function () {
  var _ref9 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(_, args, ctx, info) {
    var query, zoneName, resources, owner, usingLang, teachingLang, app, appLevel, cursor, result;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log("ARGS: ", args); // build query object

            query = {};
            args.zoneName ? query.zoneName = new RegExp(escapeRegex(args.zoneName), "gi") : null;
            args.resources ? query.resources = new RegExp(escapeRegex(args.resources), "gi") : null;

            if (!args.owner) {
              _context5.next = 8;
              break;
            }

            _context5.next = 7;
            return _zoneModel.default.findByUsername(args.owner, function (err, docs) {
              if (err) {}

              if (!(0, _isEmpty.default)(docs)) {
                var owner = docs._id;
                query.owner = owner;
              }
            });

          case 7:
            owner = _context5.sent;

          case 8:
            args.usingLang ? query.usingLang = new RegExp(escapeRegex(args.usingLang), "gi") : null;
            args.teachingLang ? query.teachingLang = new RegExp(escapeRegex(args.teachingLang), "gi") : null; // end query object

            if (args.cursor) {
              // type cast id, $lt is not the same in aggregate vs query
              cursor = _mongoose.default.Types.ObjectId(args.cursor); // add to query object

              query._id = {
                $lt: cursor
              };
            }

            _context5.next = 13;
            return _zoneModel.default.find(query).limit(12).sort({
              _id: -1
            }).exec();

          case 13:
            result = _context5.sent;

            if (!(0, _isEmpty.default)(result)) {
              _context5.next = 19;
              break;
            }

            console.log("done");
            return _context5.abrupt("return", {
              zones: [],
              cursor: "done"
            });

          case 19:
            cursor = result[result.length - 1]._id;
            return _context5.abrupt("return", {
              zones: result,
              cursor: cursor
            });

          case 21:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getZones(_x15, _x16, _x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

var zoneResolvers = {
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
    owner: function () {
      var _owner = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee6(zone) {
        var populated;
        return _regenerator.default.wrap(function _callee6$(_context6) {
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
        }, _callee6);
      }));

      function owner(_x19) {
        return _owner.apply(this, arguments);
      }

      return owner;
    }()
  }
};
exports.zoneResolvers = zoneResolvers;