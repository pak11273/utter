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

var getLevel =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_, _ref, _ref2) {
    var levelId, user, level;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            levelId = _ref.levelId;
            user = _ref2.user;
            _context.next = 4;
            return _levelModel.default.findById(levelId).exec();

          case 4:
            level = _context.sent;

            if (level) {
              _context.next = 7;
              break;
            }

            throw new Error("Cannot find level with id");

          case 7:
            return _context.abrupt("return", level);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getLevel(_x, _x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

var getLevels =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(_, args, ctx, info) {
    var course, ids, sortedLevels;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _courseModel.default.findById(args.courseId).populate("levels").limit(100).lean();

          case 2:
            course = _context2.sent;
            ids = course.levelSort;
            sortedLevels = course.levels.sort(function (a, b) {
              // Sort docs by the order of their _id values in ids.
              return ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString());
            });

            if (!(0, _isEmpty.default)(course.levels)) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", {
              levels: []
            });

          case 9:
            return _context2.abrupt("return", {
              levels: sortedLevels
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getLevels(_x4, _x5, _x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

var levelDelete =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(_, args, ctx) {
    var arrayOfErrors, token, user, level;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log("args: ", args);
            arrayOfErrors = [];

            if (!(token === "null")) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", new Error("You need to be registered to view this resource."));

          case 4:
            token = ctx.req.headers.authorization;
            _context3.next = 7;
            return (0, _resolverFunctions.userByToken)(token, function (err, res) {
              if (err) return err;
              return res;
            });

          case 7:
            user = _context3.sent;
            _context3.next = 10;
            return _levelModel.default.findByIdAndDelete(args._id);

          case 10:
            level = _context3.sent;
            console.log("level: ", level); // TODO: remove level from course

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

          case 14:
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

var levelSort =
/*#__PURE__*/
function () {
  var _ref8 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(_, _ref6, _ref7) {
    var input, redis, url, course, _id, update;

    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            input = _ref6.input;
            redis = _ref7.redis, url = _ref7.url;
            console.log("input ", input);
            _context4.next = 5;
            return _courseModel.default.findByIdAndUpdate(input.courseId, {
              levelSort: input.levelSort
            }).exec();

          case 5:
            course = _context4.sent;
            console.log("course: ", course);
            /* const redisToken = args.input.token */

            /* const redisKey = `${confirmEmailPrefix}${redisToken}` */

            /* const userId = await redis.get(redisKey) */

            _id = input._id, update = (0, _objectWithoutProperties2.default)(input, ["_id"]);
            /* Level.findByIdAndUpdate(input_id, input, {new: true}).exec() */

            return _context4.abrupt("return", {
              level: _levelModel.default,
              errors: []
            });

          case 9:
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

var levelUpdate = function levelUpdate(_, _ref9) {
  var input = _ref9.input;
  console.log("update: ", input);
  var _id = input._id,
      update = (0, _objectWithoutProperties2.default)(input, ["_id"]);
  return _levelModel.default.findByIdAndUpdate(_id, update, {
    new: true
  }).exec();
};

var levelCreate =
/*#__PURE__*/
function () {
  var _ref11 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(_, _ref10, ctx, info) {
    var input, arrayOfErrors, token, user, newLevel, level, course;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            input = _ref10.input;
            arrayOfErrors = [];
            token = ctx.req.headers.authorization;

            if (!(token === "null")) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt("return", new Error("You need to be registered to view this resource."));

          case 5:
            _context5.next = 7;
            return (0, _resolverFunctions.userByToken)(token, function (err, res) {
              if (err) return err;
              return res;
            });

          case 7:
            user = _context5.sent;
            console.log("input: ", input);
            newLevel = new _levelModel.default((0, _objectSpread2.default)({}, input, {
              course: input.courseId
            }));
            _context5.next = 12;
            return newLevel.save();

          case 12:
            level = _context5.sent;
            _context5.next = 15;
            return _courseModel.default.findById(input.courseId);

          case 15:
            course = _context5.sent;
            course.levels.push(level);
            _context5.next = 19;
            return course.save();

          case 19:
            if (course) {
              _context5.next = 23;
              break;
            }

            arrayOfErrors.push({
              path: "level",
              message: "Course was not found."
            });
            _context5.next = 24;
            break;

          case 23:
            return _context5.abrupt("return", {
              level: level,
              errors: arrayOfErrors
            });

          case 24:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function levelCreate(_x14, _x15, _x16, _x17) {
    return _ref11.apply(this, arguments);
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
    /* Level: { */

    /*   async course(level) { */

    /*     const populated = await level.populate("course").execPopulate() */

    /*     return populated.course */

    /*   } */

    /* } */

  }
};
exports.levelResolvers = levelResolvers;