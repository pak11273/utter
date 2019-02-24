"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.levelResolvers = undefined;

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

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _config = require("../../config");

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _courseModel = require("../course/course-model");

var _courseModel2 = _interopRequireDefault(_courseModel);

var _levelModel = require("./level-model");

var _levelModel2 = _interopRequireDefault(_levelModel);

var _resolverFunctions = require("../shared/resolver-functions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var escapeRegex = function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

var getLevel = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_, _ref2, _ref3) {
    var levelId = _ref2.levelId;
    var user = _ref3.user;
    var level;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _levelModel2.default.findById(levelId).exec();

          case 2:
            level = _context.sent;

            if (level) {
              _context.next = 5;
              break;
            }

            throw new Error("Cannot find level with id");

          case 5:
            return _context.abrupt("return", level);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getLevel(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var levelDelete = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_, args, ctx) {
    var arrayOfErrors, token, user, level;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
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
            return _courseModel2.default.findOneAndUpdate({
              _id: args.courseId
            }, {
              $pull: {
                levels: {
                  level: args.level
                }
              }
            }, { new: true });

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
    }, _callee2, undefined);
  }));

  return function levelDelete(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var levelUpdate = function levelUpdate(_, _ref5) {
  var input = _ref5.input;
  var id = input.id,
      update = (0, _objectWithoutProperties3.default)(input, ["id"]);

  return _levelModel2.default.findByIdAndUpdate(id, update, { new: true }).exec();
};

var levelCreate = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_, args, ctx, info) {
    var arrayOfErrors, token, user, input, level;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
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


            console.log("input: ", input);

            _context3.next = 11;
            return _courseModel2.default.findOneAndUpdate({
              _id: input.courseId,
              "levels.level": {
                $ne: input.level
              }
            }, {
              $push: {
                levels: {
                  level: input.level,
                  title: input.title
                }
              }
            }, { new: true });

          case 11:
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

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function levelCreate(_x7, _x8, _x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

var getLevels = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_, args, ctx, info) {
    var result;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _courseModel2.default.find({ _id: args.courseId }).sort({ _id: -1 }).exec();

          case 2:
            result = _context4.sent;

            if (!(0, _isEmpty2.default)(result)) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", { levels: [] });

          case 7:
            return _context4.abrupt("return", { levels: result[0].levels });

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getLevels(_x11, _x12, _x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

var levelResolvers = exports.levelResolvers = {
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
  } };
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(levelResolvers, "levelResolvers", "src/api/level/level-resolvers.js");
  reactHotLoader.register(escapeRegex, "escapeRegex", "src/api/level/level-resolvers.js");
  reactHotLoader.register(getLevel, "getLevel", "src/api/level/level-resolvers.js");
  reactHotLoader.register(levelDelete, "levelDelete", "src/api/level/level-resolvers.js");
  reactHotLoader.register(levelUpdate, "levelUpdate", "src/api/level/level-resolvers.js");
  reactHotLoader.register(levelCreate, "levelCreate", "src/api/level/level-resolvers.js");
  reactHotLoader.register(getLevels, "getLevels", "src/api/level/level-resolvers.js");
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

  reactHotLoader.register(levelResolvers, "levelResolvers", "src/api/level/level-resolvers.js");
  reactHotLoader.register(escapeRegex, "escapeRegex", "src/api/level/level-resolvers.js");
  reactHotLoader.register(getLevel, "getLevel", "src/api/level/level-resolvers.js");
  reactHotLoader.register(levelDelete, "levelDelete", "src/api/level/level-resolvers.js");
  reactHotLoader.register(levelUpdate, "levelUpdate", "src/api/level/level-resolvers.js");
  reactHotLoader.register(levelCreate, "levelCreate", "src/api/level/level-resolvers.js");
  reactHotLoader.register(getLevels, "getLevels", "src/api/level/level-resolvers.js");
  leaveModule(module);
})();

;