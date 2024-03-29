"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.levelResolvers = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _config = _interopRequireDefault(require("../../config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _courseModel = _interopRequireDefault(require("../course/course-model"));

var _levelModel = _interopRequireDefault(require("./level-model"));

var _resolverFunctions = require("../shared/resolver-functions.js");

var escapeRegex = function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

var getLevel = function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
    var levelId, user, level;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            levelId = _ref.levelId;
            user = _ref2.user;
            console.log("level: ", levelId);
            _context.prev = 3;
            _context.next = 6;
            return _levelModel["default"].findById(levelId).populate("vocabulary").lean();

          case 6:
            level = _context.sent;

            if (level) {
              _context.next = 9;
              break;
            }

            throw new Error("Cannot find level with id");

          case 9:
            return _context.abrupt("return", level);

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](3);
            console.log("err: ", _context.t0);
            return _context.abrupt("return", _context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 12]]);
  }));

  return function getLevel(_x, _x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

var getLevels = function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2(_, args, ctx, info) {
    var arrayOfErrors, course, ids, sortedLevels;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            arrayOfErrors = [];
            _context2.prev = 1;
            _context2.next = 4;
            return _courseModel["default"].findById(args.courseId).populate("levels").limit(100).lean();

          case 4:
            course = _context2.sent;

            if (course) {
              _context2.next = 7;
              break;
            }

            throw new Error("This course has been removed by the author.  It will be removed from your subscriptions.  Please select a different course.");

          case 7:
            ids = course.levelSort;
            sortedLevels = course.levels.sort(function (a, b) {
              return ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString());
            });

            if (!(0, _isEmpty["default"])(course.levels)) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", {
              levels: []
            });

          case 13:
            return _context2.abrupt("return", {
              levels: sortedLevels
            });

          case 14:
            _context2.next = 20;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](1);
            console.log("msg: ", _context2.t0);
            return _context2.abrupt("return", _context2.t0);

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 16]]);
  }));

  return function getLevels(_x4, _x5, _x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

var levelDelete = function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3(_, args, ctx) {
    var arrayOfErrors, token, user, level, course;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            arrayOfErrors = [];

            if (!(token === "null")) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", new Error("You need to be registered to view this resource."));

          case 3:
            token = ctx.req.headers.authorization;
            _context3.next = 6;
            return (0, _resolverFunctions.userByToken)(token, function (err, res) {
              if (err) return err;
              return res;
            });

          case 6:
            user = _context3.sent;
            _context3.next = 9;
            return _levelModel["default"].findOneAndDelete({
              _id: args._id
            }).lean();

          case 9:
            level = _context3.sent;
            _context3.next = 12;
            return _courseModel["default"].findById(level.course);

          case 12:
            course = _context3.sent;
            course.levels.pull(level._id);
            course.save();

            if (!level) {
              arrayOfErrors.push({
                path: "level",
                message: "An Error has occured.  Please contact technical support."
              });
            }

            return _context3.abrupt("return", {
              level: level,
              errors: arrayOfErrors
            });

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function levelDelete(_x8, _x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var levelSort = function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee4(_, _ref6, _ref7) {
    var input, redis, url, course, _id, update;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            input = _ref6.input;
            redis = _ref7.redis, url = _ref7.url;
            _context4.next = 4;
            return _courseModel["default"].findByIdAndUpdate(input.courseId, {
              levelSort: input.levelSort
            }).exec();

          case 4:
            course = _context4.sent;
            _id = input._id, update = (0, _objectWithoutProperties2["default"])(input, ["_id"]);
            return _context4.abrupt("return", {
              level: _levelModel["default"],
              errors: []
            });

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function levelSort(_x11, _x12, _x13) {
    return _ref8.apply(this, arguments);
  };
}();

var levelUpdate = function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee5(_, _ref9) {
    var input, arrayOfErrors, _id, update, updatedLevel;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            input = _ref9.input;
            _context5.prev = 1;
            arrayOfErrors = [];
            _id = input._id, update = (0, _objectWithoutProperties2["default"])(input, ["_id"]);
            _context5.next = 6;
            return _levelModel["default"].findByIdAndUpdate(_id, update, {
              "new": true
            }).lean();

          case 6:
            updatedLevel = _context5.sent;
            return _context5.abrupt("return", {
              level: updatedLevel,
              errors: arrayOfErrors
            });

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](1);

            if (_context5.t0) {
              arrayOfErrors.push({
                path: "title",
                message: _context5.t0
              });
            }

            return _context5.abrupt("return", {
              level: [],
              errors: arrayOfErrors
            });

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 10]]);
  }));

  return function levelUpdate(_x14, _x15) {
    return _ref10.apply(this, arguments);
  };
}();

var levelCreate = function () {
  var _ref12 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee6(_, _ref11, ctx, info) {
    var input, arrayOfErrors, token, user, newLevel, level, course;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            input = _ref11.input;
            console.log("input: ", input);
            arrayOfErrors = [];
            token = ctx.req.headers.authorization;

            if (!(token === "null")) {
              _context6.next = 6;
              break;
            }

            return _context6.abrupt("return", new Error("You need to be registered to view this resource."));

          case 6:
            _context6.next = 8;
            return (0, _resolverFunctions.userByToken)(token, function (err, res) {
              if (err) return err;
              return res;
            });

          case 8:
            user = _context6.sent;
            newLevel = new _levelModel["default"]((0, _objectSpread2["default"])({}, input, {
              course: input.courseId
            }));
            _context6.next = 12;
            return newLevel.save();

          case 12:
            level = _context6.sent;
            _context6.next = 15;
            return _courseModel["default"].findById(input.courseId);

          case 15:
            course = _context6.sent;
            course.levels.push(level);
            _context6.next = 19;
            return course.save();

          case 19:
            if (course) {
              _context6.next = 23;
              break;
            }

            arrayOfErrors.push({
              path: "level",
              message: "Course was not found."
            });
            _context6.next = 24;
            break;

          case 23:
            return _context6.abrupt("return", {
              level: level,
              errors: arrayOfErrors
            });

          case 24:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function levelCreate(_x16, _x17, _x18, _x19) {
    return _ref12.apply(this, arguments);
  };
}();

var levelResolvers = {
  Query: {
    getLevels: getLevels,
    getLevel: getLevel
  },
  Mutation: {
    levelDelete: levelDelete,
    levelCreate: levelCreate,
    levelSort: levelSort,
    levelUpdate: levelUpdate
  }
};
exports.levelResolvers = levelResolvers;