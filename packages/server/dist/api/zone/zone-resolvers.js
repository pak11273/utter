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

var _courseModel = _interopRequireDefault(require("../course/course-model.js"));

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
  var _ref10 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(_, args, _ref9, info) {
    var req, user, input, newZone, zone, createdZone;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            req = _ref9.req;
            _context5.prev = 1;

            if (!(!req.session || !req.session.userId)) {
              _context5.next = 4;
              break;
            }

            throw new Error("Not authenticated.");

          case 4:
            _context5.next = 6;
            return _userModel.default.findById(req.session.userId, function (err, res) {
              if (err) return err;
              return res;
            });

          case 6:
            user = _context5.sent;
            input = args.input;
            newZone = new _zoneModel.default({
              app: input.app,
              course: input.course,
              courseLevel: +input.courseLevel,
              ageGroup: input.ageGroup,
              owner: input.owner,
              zoneName: input.zoneName,
              zoneDescription: input.zoneDescription,
              teachingLang: input.teachingLang,
              usingLang: input.usingLang
            });
            _context5.next = 11;
            return newZone.save();

          case 11:
            zone = _context5.sent;
            createdZone = (0, _objectSpread2.default)({}, zone._doc, {
              _id: zone._doc._id.toString(),
              owner: userById.bind(_this, zone._doc.owner),
              course: _courseModel.default.findById(input.course)
            });
            return _context5.abrupt("return", createdZone);

          case 16:
            _context5.prev = 16;
            _context5.t0 = _context5["catch"](1);
            throw _context5.t0;

          case 19:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 16]]);
  }));

  return function zoneCreate(_x9, _x10, _x11, _x12) {
    return _ref10.apply(this, arguments);
  };
}();

var getZoneLevels =
/*#__PURE__*/
function () {
  var _ref11 = (0, _asyncToGenerator2.default)(
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
    return _ref11.apply(this, arguments);
  };
}();

var getZones =
/*#__PURE__*/
function () {
  var _ref12 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee7(_, args, ctx, info) {
    var more, input, hostMatch, zoneMatch, usingLangMatch, teachingLangMatch, appMatch, titleMatch, cursor, key, zones, lastZones, lastZone, obj;
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            more = false;
            input = args.input;
            console.log("input: ", input);
            hostMatch = new RegExp(".", "i");
            /* var levelMatch = new RegExp(".", "i") */

            zoneMatch = new RegExp(".", "i");
            usingLangMatch = new RegExp(".", "i");
            teachingLangMatch = new RegExp(".", "i");
            appMatch = new RegExp(".", "i");
            titleMatch = new RegExp(".", "i");

            if (input.searchInput || input.selectionBox) {
              input[input.selectionBox] = input.searchInput;
              delete input.selectionBox;
            }

            cursor = {
              null: null
            };

            if (input.cursor) {
              cursor = {
                $lt: input.cursor
              };
              delete input.cursor;
            }

            console.log("curser: ", cursor);

            for (key in input) {
              if (input[key] !== "") {
                if (key === "host" && input.searchInput !== "") {
                  hostMatch = input[key];
                }
                /* if (key === "level" && input.searchInput !== "") { */

                /*   levelMatch = +input[key] */

                /* } */


                if (key === "zoneName" && input.searchInput !== "") {
                  zoneMatch = new RegExp(input[key], "i");
                }

                if (key === "usingLang") {
                  usingLangMatch = input[key];
                }

                if (key === "teachingLang") {
                  teachingLangMatch = input[key];
                }

                if (key === "app") {
                  appMatch = input[key];
                }

                if (key === "subscriptions") {
                  titleMatch = input[key];
                }
              }

              delete input.searchInput;
            }

            _context7.prev = 14;
            _context7.next = 17;
            return _zoneModel.default.aggregate([{
              $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerCourse"
              }
            }, {
              $unwind: "$ownerCourse"
            }, {
              $lookup: {
                from: "courses",
                localField: "course",
                foreignField: "_id",
                as: "zoneCourse"
              }
            }, {
              $unwind: "$zoneCourse"
            }, {
              $match: {
                $and: [cursor, {
                  app: appMatch
                },
                /* {courseLevel: levelMatch}, */
                {
                  zoneName: zoneMatch
                }, {
                  "ownerCourse.username": hostMatch
                }, {
                  "zoneCourse.usingLang": usingLangMatch
                }, {
                  "zoneCourse.teachingLang": teachingLangMatch
                }, {
                  "zoneCourse.title": titleMatch
                }]
              }
            }]).sort({
              _id: -1
            }).limit(4);

          case 17:
            zones = _context7.sent;
            _context7.next = 20;
            return _zoneModel.default.find(cursor).sort({
              _id: -1
            }).lean();

          case 20:
            lastZones = _context7.sent;
            console.log("zones: ", zones);
            console.log("lastZones: ", lastZones);
            console.log("zones: ", zones.map(function (item) {
              return item._id;
            }));

            if (lastZones.length !== 0) {
              lastZone = lastZones[lastZones.length - 1]._id;
            } else {
              lastZone = {};
            }

            console.log("last zone: ", lastZone);
            obj = zones.find(function (o) {
              return o._id.toString() === lastZone._id.toString();
            });

            if (obj) {
              more = false;
            } else {
              more = true;
            }

            console.log("more: ", more);
            return _context7.abrupt("return", {
              zones: zones,
              more: more
            });

          case 32:
            _context7.prev = 32;
            _context7.t0 = _context7["catch"](14);
            throw _context7.t0;

          case 35:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[14, 32]]);
  }));

  return function getZones(_x17, _x18, _x19, _x20) {
    return _ref12.apply(this, arguments);
  };
}();

var rezone =
/*#__PURE__*/
function () {
  var _ref13 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee8(_, args, ctx, info) {
    var query;
    return _regenerator.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            // build query object
            query = {};
            query.owner = ctx.user; //TODO

          case 2:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function rezone(_x21, _x22, _x23, _x24) {
    return _ref13.apply(this, arguments);
  };
}();

var zoneResolvers = {
  Query: {
    getZones: getZones,
    getZone: getZone,
    getZoneLevels: getZoneLevels
  },
  Mutation: {
    rezone: rezone,
    zoneDelete: zoneDelete,
    zoneUpdate: zoneUpdate,
    zoneCreate: zoneCreate
  }
};
exports.zoneResolvers = zoneResolvers;