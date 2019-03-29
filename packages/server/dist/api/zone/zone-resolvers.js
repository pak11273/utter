"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zoneResolvers = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _userModel = _interopRequireDefault(require("../user/user-model.js"));

var _zoneModel = _interopRequireDefault(require("./zone-model"));

var _this = void 0;

var escapeRegex = function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

var userById =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(userId) {
    var user;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _userModel.default.findById(userId).lean();

          case 3:
            user = _context.sent;

            if (!user) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", (0, _objectSpread2.default)({}, user, {
              createdZones: zonesById.bind(_this, user.createdZones)
            }));

          case 6:
            return _context.abrupt("return", {
              username: ""
            });

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function userById(_x) {
    return _ref.apply(this, arguments);
  };
}();

var zonesById =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(zoneIds) {
    var zones;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _zoneModel.default.find({
              _id: {
                $in: zoneIds
              }
            }).lean();

          case 3:
            zones = _context2.sent;
            return _context2.abrupt("return", zones.map(function (zone) {
              return (0, _objectSpread2.default)({}, zone, {
                owner: userById.bind(_this, zone.owner)
              });
            }));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function zonesById(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getZone =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(_, _ref3, _ref4) {
    var zoneId, user, zone;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            zoneId = _ref3.zoneId;
            user = _ref4.user;
            _context3.next = 4;
            return _zoneModel.default.findById(zoneId).exec();

          case 4:
            zone = _context3.sent;

            if (zone) {
              _context3.next = 7;
              break;
            }

            throw new Error("Cannot find zone with id");

          case 7:
            return _context3.abrupt("return", zone);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getZone(_x3, _x4, _x5) {
    return _ref5.apply(this, arguments);
  };
}();

var zoneDelete =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(_, _ref6, ctx) {
    var id, zone;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = _ref6.id;
            _context4.next = 3;
            return _zoneModel.default.findById(id).exec();

          case 3:
            zone = _context4.sent;

            if (zone) {
              _context4.next = 6;
              break;
            }

            throw new Error("No zone found.");

          case 6:
            if (zone.owner === id) {// TODO: delete zone
            }

            return _context4.abrupt("return", zone);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function zoneDelete(_x6, _x7, _x8) {
    return _ref7.apply(this, arguments);
  };
}();

var zoneUpdate = function zoneUpdate(_, _ref8) {
  var input = _ref8.input;
  var id = input.id,
      update = (0, _objectWithoutProperties2.default)(input, ["id"]);
  return _zoneModel.default.findByIdAndUpdate(id, update, {
    new: true
  }).exec();
};

var zoneCreate =
/*#__PURE__*/
function () {
  var _ref9 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(_, args, ctx, info) {
    var input, zone, newZone, createdZone;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            //TODO can't have duplicate zone names
            input = args.input;
            console.log("ingput: ", input);
            _context5.next = 4;
            return _zoneModel.default.create(input);

          case 4:
            zone = _context5.sent;
            newZone = new _zoneModel.default({
              app: input.app,
              courseLevel: input.courseLevel,
              ageGroup: input.ageGroup,
              owner: input.owner,
              zoneName: input.zoneName,
              zoneDescription: input.zoneDescription,
              teachingLang: input.teachingLang,
              usingLang: input.usingLang
            });

            /* zone.id = zone._id */
            createdZone = (0, _objectSpread2.default)({}, zone._doc, {
              _id: zone._doc._id.toString(),
              owner: userById.bind(_this, zone._doc.owner)
            });
            console.log("zone: ", createdZone);
            return _context5.abrupt("return", createdZone);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function zoneCreate(_x9, _x10, _x11, _x12) {
    return _ref9.apply(this, arguments);
  };
}();

var getZoneLevels =
/*#__PURE__*/
function () {
  var _ref10 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee6(_, args, ctx, info) {
    var query;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            // build query object
            query = {};
            query.owner = ctx.user;

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getZoneLevels(_x13, _x14, _x15, _x16) {
    return _ref10.apply(this, arguments);
  };
}();

var getZones =
/*#__PURE__*/
function () {
  var _ref11 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee7(_, args, ctx, info) {
    var input, query, key, zones, convertedZones;
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            input = args.input;

            if (input.searchInput || input.selectionBox) {
              input[input.selectionBox] = input.searchInput;
              delete input.searchInput;
              delete input.selectionBox;
            }

            query = {};

            for (key in input) {
              input[key] !== "" ? query[key] = input[key] : null;
            }

            query.title ? query.title = new RegExp(escapeRegex(query.title), "gi") : null;

            if (!query.owner) {
              _context7.next = 9;
              break;
            }

            _context7.next = 8;
            return _userModel.default.findOne({
              username: query.owner
            }, function (err, docs) {
              if (err) {
                throw err;
              }

              if (!(0, _isEmpty.default)(docs)) {
                var owner = docs._id;
                query.owner = docs._id;
              }
            });

          case 8:
            query.owner = _context7.sent;

          case 9:
            query.resource ? query.resource = new RegExp(escapeRegex(query.resource), "gi") : null; // type cast id because $lt is not the same in aggregate vs query

            /* var cursorObj = mongoose.Types.ObjectId(query.cursor) */

            if (query.cursor) {
              query._id = {
                $gt: query.cursor || null
              };
              delete query.cursor;
            }

            _context7.prev = 11;
            _context7.next = 14;
            return _zoneModel.default.find(query).lean().sort({
              _id: -1
            }).limit(8);

          case 14:
            zones = _context7.sent;
            convertedZones = zones.map(function (zone) {
              return (0, _objectSpread2.default)({}, zone, {
                owner: userById.bind(_this, zone.owner)
              });
            });
            return _context7.abrupt("return", {
              zones: convertedZones,
              cursor: ""
            });

          case 21:
            cursor = zones[zones.length - 1]._id;
            return _context7.abrupt("return", {
              zones: zones,
              cursor: cursor
            });

          case 23:
            _context7.next = 28;
            break;

          case 25:
            _context7.prev = 25;
            _context7.t0 = _context7["catch"](11);
            throw _context7.t0;

          case 28:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[11, 25]]);
  }));

  return function getZones(_x17, _x18, _x19, _x20) {
    return _ref11.apply(this, arguments);
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
    /* Zone: { */

    /*   async owner(zone) { */

    /*     const populated = await zone.populate("owner").execPopulate() */

    /*     return populated.owner */

    /*   } */

    /* } */

  }
};
exports.zoneResolvers = zoneResolvers;