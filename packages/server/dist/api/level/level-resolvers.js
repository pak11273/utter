"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.levelResolvers = void 0;

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _config = _interopRequireDefault(require("../../config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _courseModel = _interopRequireDefault(require("../course/course-model"));

var _levelModel = _interopRequireDefault(require("./level-model"));

var _resolverFunctions = require("../shared/resolver-functions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var escapeRegex = function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

var getLevel =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_, _ref, _ref2) {
    var levelId, user, level;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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

var levelDelete =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_, args, ctx) {
    var arrayOfErrors, token, user, level;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            arrayOfErrors = [];

            if (!(token === "null")) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", new Error("You need to be registered to view this resource."));

          case 3:
            token = ctx.req.headers.authorization;
            _context2.next = 6;
            return (0, _resolverFunctions.userByToken)(token, function (err, res) {
              if (err) return err;
              return res;
            });

          case 6:
            user = _context2.sent;
            console.log("args: ", args);
            _context2.next = 10;
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

          case 10:
            level = _context2.sent;
            console.log("LEVELVELVELVLELVELVELEL: ", level);

            if (!level) {
              arrayOfErrors.push({
                path: "level",
                message: "An Error has occured.  Please contact technical support."
              });
            }

            console.log("array of errors: ", arrayOfErrors);
            return _context2.abrupt("return", {
              level: args,
              errors: arrayOfErrors
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function levelDelete(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var levelUpdate = function levelUpdate(_, _ref5) {
  var input = _ref5.input;

  var _id = input._id,
      update = _objectWithoutProperties(input, ["_id"]);

  return _levelModel.default.findByIdAndUpdate(_id, update, {
    new: true
  }).exec();
};

var levelCreate =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_, args, ctx, info) {
    var arrayOfErrors, token, user, input, level;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            arrayOfErrors = [];
            token = ctx.req.headers.authorization;

            if (!(token === "null")) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", new Error("You need to be registered to view this resource."));

          case 4:
            _context3.next = 6;
            return (0, _resolverFunctions.userByToken)(token, function (err, res) {
              if (err) return err;
              return res;
            });

          case 6:
            user = _context3.sent;
            input = args.input;
            _context3.next = 10;
            return _courseModel.default.findOneAndUpdate({
              _id: input.courseId,
              "levels.level": {
                $ne: input.level
              }
            }, {
              $push: {
                levels: {
                  courseId: input.courseId,
                  level: input.level,
                  title: input.title
                }
              }
            }, {
              new: true
            });

          case 10:
            level = _context3.sent;

            if (!level) {
              arrayOfErrors.push({
                path: "level",
                message: "Courses cannot have duplicate level numbers."
              });
            }

            return _context3.abrupt("return", {
              level: level.levels[level.levels.length - 1],
              errors: arrayOfErrors
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function levelCreate(_x7, _x8, _x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

var getLevels =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(_, args, ctx, info) {
    var result, sortedLevels;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _courseModel.default.find({
              _id: args.courseId
            }).exec();

          case 2:
            result = _context4.sent;
            sortedLevels = result[0].levels.sort(function (a, b) {
              return a.level - b.level;
            });

            if (!(0, _isEmpty.default)(result)) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", {
              levels: []
            });

          case 8:
            return _context4.abrupt("return", {
              levels: sortedLevels
            });

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getLevels(_x11, _x12, _x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

var levelResolvers = {
  Query: {
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