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
            console.log("args: ", args);
            _context3.next = 11;
            return _courseModel.default.findOneAndUpdate({
              _id: args.courseId
            }, {
              $pull: {
                levels: {
                  level: args.level
                }
              }
            }, {
              new: true
            });

          case 11:
            level = _context3.sent;
            console.log("LEVELVELVELVLELVELVELEL: ", level);

            if (!level) {
              arrayOfErrors.push({
                path: "level",
                message: "An Error has occured.  Please contact technical support."
              });
            }

            console.log("array of errors: ", arrayOfErrors);
            return _context3.abrupt("return", {
              level: args,
              errors: arrayOfErrors
            });

          case 16:
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
    var arrayOfErrors, token, user, input, newLevel, levelCourse, level, course;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log("args: ", args);
            _context4.prev = 1;
            arrayOfErrors = [];
            token = ctx.req.headers.authorization;

            if (!(token === "null")) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", new Error("You need to be registered to view this resource."));

          case 6:
            _context4.next = 8;
            return (0, _resolverFunctions.userByToken)(token, function (err, res) {
              if (err) return err;
              return res;
            });

          case 8:
            user = _context4.sent;
            input = args.input;
            newLevel = new _levelModel.default({
              level: input.level,
              title: input.title,
              courseId: input.courseId
            });
            _context4.next = 13;
            return newLevel.save();

          case 13:
            level = _context4.sent;
            console.log("levle; ", level);
            levelCourse = (0, _objectSpread2.default)({}, level._doc, {
              _id: level._doc._id.toString()
            });
            _context4.next = 18;
            return _courseModel.default.findById(input.courseId);

          case 18:
            course = _context4.sent;
            console.log("cours: ", course);

            if (course) {
              _context4.next = 22;
              break;
            }

            throw new Error("Course not found.");

          case 22:
            course.levels.push(level);
            _context4.next = 25;
            return course.save();

          case 25:
            return _context4.abrupt("return", levelCourse);

          case 28:
            _context4.prev = 28;
            _context4.t0 = _context4["catch"](1);
            throw _context4.t0;

          case 31:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 28]]);
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
            console.log("get level args: ", args);
            console.log("get levels");
            _context5.prev = 2;
            _context5.next = 5;
            return _levelModel.default.find();

          case 5:
            result = _context5.sent;
            console.log("result: ", result);

            if (result) {
              sortedLevels = result.sort(function (a, b) {
                return a.level - b.level;
              });
            }

            if (!(0, _isEmpty.default)(result)) {
              _context5.next = 12;
              break;
            }

            return _context5.abrupt("return", {
              levels: []
            });

          case 12:
            return _context5.abrupt("return", {
              levels: sortedLevels
            });

          case 13:
            _context5.next = 18;
            break;

          case 15:
            _context5.prev = 15;
            _context5.t0 = _context5["catch"](2);
            return _context5.abrupt("return", _context5.t0);

          case 18:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 15]]);
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