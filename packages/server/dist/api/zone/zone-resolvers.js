"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zoneResolvers = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

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

var userById = function () {
  var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(userId) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _userModel["default"].findById(userId).lean();

          case 3:
            user = _context.sent;

            if (!user) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", (0, _objectSpread2["default"])({}, user, {
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

var zonesById = function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2(zoneIds) {
    var zones;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _zoneModel["default"].find({
              _id: {
                $in: zoneIds
              }
            }).lean();

          case 3:
            zones = _context2.sent;
            return _context2.abrupt("return", zones.map(function (zone) {
              return (0, _objectSpread2["default"])({}, zone, {
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

var getZone = function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3(_, _ref3, _ref4) {
    var zoneId, user, zone;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            zoneId = _ref3.zoneId;
            user = _ref4.user;
            _context3.next = 4;
            return _zoneModel["default"].findById(zoneId).exec();

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

var zoneDelete = function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee4(_, _ref6, _ref7) {
    var _id, req, zone;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _id = _ref6._id;
            req = _ref7.req;
            _context4.prev = 2;

            if (!(!req.session || !req.session.userId)) {
              _context4.next = 5;
              break;
            }

            throw new Error("Not authenticated.");

          case 5:
            _context4.next = 7;
            return _zoneModel["default"].findOneAndDelete({
              owner: req.session.userId
            }).exec();

          case 7:
            zone = _context4.sent;

            if (zone) {
              _context4.next = 10;
              break;
            }

            throw new Error("We could not find this zone.");

          case 10:
            if (!zone) {
              _context4.next = 12;
              break;
            }

            return _context4.abrupt("return", true);

          case 12:
            _context4.next = 17;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](2);
            return _context4.abrupt("return", _context4.t0);

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 14]]);
  }));

  return function zoneDelete(_x6, _x7, _x8) {
    return _ref8.apply(this, arguments);
  };
}();

var zoneUpdate = function zoneUpdate(_, _ref9) {
  var input = _ref9.input;
  var id = input.id,
      update = (0, _objectWithoutProperties2["default"])(input, ["id"]);
  return _zoneModel["default"].findByIdAndUpdate(id, update, {
    "new": true
  }).exec();
};

var zoneCreate = function () {
  var _ref12 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee5(_, _ref10, _ref11, info) {
    var input, req, _ref13, findZone, user, course, newZone, zone, createdZone;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            input = _ref10.input;
            req = _ref11.req;
            _context5.prev = 2;

            if (!(!req.session || !req.session.userId)) {
              _context5.next = 5;
              break;
            }

            throw new Error("Not authenticated.");

          case 5:
            _context5.next = 7;
            return _zoneModel["default"].find({
              owner: req.session.userId
            });

          case 7:
            findZone = _context5.sent;

            if (!(findZone[0] instanceof _mongoose["default"].Document)) {
              _context5.next = 10;
              break;
            }

            throw new Error("You can only host one zone at a time.");

          case 10:
            _context5.next = 12;
            return _userModel["default"].findById(req.session.userId, function (err, res) {
              if (err) return err;
              return res;
            });

          case 12:
            user = _context5.sent;
            _context5.next = 15;
            return _courseModel["default"].findById(input.course, function (err, res) {
              if (err) return err;
              return res;
            });

          case 15:
            course = _context5.sent;
            newZone = new _zoneModel["default"]((_ref13 = {
              app: input.app,
              course: course._id,
              zoneName: course.zoneName,
              courseLevel: +input.courseLevel,
              ageGroup: input.ageGroup,
              owner: input.owner,
              password: input.password,
              "private": input["private"]
            }, (0, _defineProperty2["default"])(_ref13, "zoneName", input.zoneName), (0, _defineProperty2["default"])(_ref13, "zoneDescription", input.zoneDescription), (0, _defineProperty2["default"])(_ref13, "teachingLang", course.teachingLang), (0, _defineProperty2["default"])(_ref13, "usingLang", course.usingLang), _ref13));
            _context5.next = 19;
            return newZone.save();

          case 19:
            zone = _context5.sent;
            createdZone = (0, _objectSpread2["default"])({}, zone._doc, {
              _id: zone._doc._id.toString(),
              owner: userById.bind(_this, zone._doc.owner),
              course: _courseModel["default"].findById(input.course)
            });
            return _context5.abrupt("return", createdZone);

          case 24:
            _context5.prev = 24;
            _context5.t0 = _context5["catch"](2);
            throw _context5.t0;

          case 27:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 24]]);
  }));

  return function zoneCreate(_x9, _x10, _x11, _x12) {
    return _ref12.apply(this, arguments);
  };
}();

var getZoneLevels = function () {
  var _ref14 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee6(_, args, ctx, info) {
    var query;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
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
    return _ref14.apply(this, arguments);
  };
}();

var getZones = function () {
  var _ref16 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee7(_, _ref15, ctx, info) {
    var input, options, query, key;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            input = _ref15.input;
            options = {
              lean: true,
              page: input.page,
              limit: 24,
              populate: ["owner", "course"],
              collation: {
                locale: "en"
              }
            };
            delete input.page;
            query = {};

            for (key in input) {
              input[key] !== "" ? query[key] = input[key] : null;
            }

            input.searchInput ? query = (0, _objectSpread2["default"])({}, query, {
              $text: {
                $search: input.searchInput
              }
            }) : null;
            delete query.searchInput;
            delete query.selectionBox;
            return _context7.abrupt("return", _zoneModel["default"].paginate(query, options, function (err, result) {
              return {
                page: result.page,
                zones: result.docs,
                more: result.hasNextPage
              };
            }));

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getZones(_x17, _x18, _x19, _x20) {
    return _ref16.apply(this, arguments);
  };
}();

var rezone = function () {
  var _ref18 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee8(_, __, _ref17, info) {
    var req, query, hostedZone;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            req = _ref17.req;
            query = {};
            query.owner = req.session;
            _context8.next = 5;
            return _zoneModel["default"].findOne({
              owner: req.session.userId
            }).populate("owner").exec();

          case 5:
            hostedZone = _context8.sent;
            return _context8.abrupt("return", hostedZone);

          case 7:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function rezone(_x21, _x22, _x23, _x24) {
    return _ref18.apply(this, arguments);
  };
}();

var zoneResolvers = {
  Query: {
    getZones: getZones,
    getZone: getZone,
    getZoneLevels: getZoneLevels,
    rezone: rezone
  },
  Mutation: {
    zoneDelete: zoneDelete,
    zoneUpdate: zoneUpdate,
    zoneCreate: zoneCreate
  }
};
exports.zoneResolvers = zoneResolvers;