"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.levelResolvers = void 0;

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

var allLevels =
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
            console.log("hello");
            _context.next = 5;
            return _levelModel.default.findById(levelId).exec();

          case 5:
            level = _context.sent;

            if (level) {
              _context.next = 8;
              break;
            }

            throw new Error("Cannot find level with id");

          case 8:
            return _context.abrupt("return", level);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function allLevels(_x, _x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

var getLevel =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(_, _ref4, _ref5) {
    var levelId, user, level;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            levelId = _ref4.levelId;
            user = _ref5.user;
            console.log("bye");
            _context2.next = 5;
            return _levelModel.default.findById(levelId).exec();

          case 5:
            level = _context2.sent;

            if (level) {
              _context2.next = 8;
              break;
            }

            throw new Error("Cannot find level with id");

          case 8:
            return _context2.abrupt("return", level);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getLevel(_x4, _x5, _x6) {
    return _ref6.apply(this, arguments);
  };
}();

var levelDelete =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(_, args, ctx) {
    var arrayOfErrors, token, user, level;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log("nah");
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

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function levelDelete(_x7, _x8, _x9) {
    return _ref7.apply(this, arguments);
  };
}();

var levelUpdate = function levelUpdate(_, _ref8) {
  var input = _ref8.input;
  console.log("update");
  var _id = input._id,
      update = (0, _objectWithoutProperties2.default)(input, ["_id"]);
  return _levelModel.default.findByIdAndUpdate(_id, update, {
    new: true
  }).exec();
};

var levelCreate =
/*#__PURE__*/
function () {
  var _ref9 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(_, args, ctx, info) {
    var arrayOfErrors, token, user, input, newLevel, level, course;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log("args: ", args);
            arrayOfErrors = [];
            token = ctx.req.headers.authorization;

            if (!(token === "null")) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt("return", new Error("You need to be registered to view this resource."));

          case 5:
            _context4.next = 7;
            return (0, _resolverFunctions.userByToken)(token, function (err, res) {
              if (err) return err;
              return res;
            });

          case 7:
            user = _context4.sent;
            input = args.input;
            newLevel = new _levelModel.default(input);
            _context4.next = 12;
            return newLevel.save();

          case 12:
            level = _context4.sent;
            _context4.next = 15;
            return _courseModel.default.findById(input.courseId);

          case 15:
            course = _context4.sent;
            course.levels.push(level);
            _context4.next = 19;
            return course.save();

          case 19:
            console.log("course: ", course);

            if (course) {
              _context4.next = 23;
              break;
            }

            arrayOfErrors.push({
              path: "level",
              message: "Course was not found."
            });
            return _context4.abrupt("return", {
              level: level,
              errors: arrayOfErrors
            });

          case 23:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function levelCreate(_x10, _x11, _x12, _x13) {
    return _ref9.apply(this, arguments);
  };
}();

var getLevels =
/*#__PURE__*/
function () {
  var _ref10 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(_, args, ctx, info) {
    var result, sortedLevels;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _courseModel.default.find({
              _id: args.courseId
            }).populate("levels").sort({
              _id: -1
            }).limit(100).lean();

          case 2:
            result = _context5.sent;
            sortedLevels = result[0].levels.sort(function (a, b) {
              return a.level - b.level;
            });

            if (!(0, _isEmpty.default)(result)) {
              _context5.next = 8;
              break;
            }

            return _context5.abrupt("return", {
              levels: []
            });

          case 8:
            return _context5.abrupt("return", {
              levels: sortedLevels
            });

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getLevels(_x14, _x15, _x16, _x17) {
    return _ref10.apply(this, arguments);
  };
}();

var levelResolvers = {
  Query: {
    allLevels: allLevels,
    getLevels: getLevels,
    getLevel: getLevel
  },
  Mutation: {
    levelDelete: levelDelete,
    levelUpdate: levelUpdate,
    levelCreate: levelCreate
    /* Level: { */

    /*   async course(level) { */

    /*     const populated = await level.populate("course").execPopulate() */

    /*     return populated.course */

    /*   } */

    /* } */

  }
};
exports.levelResolvers = levelResolvers;