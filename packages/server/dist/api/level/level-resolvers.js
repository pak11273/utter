"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.levelResolvers = undefined;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _lodash = require("lodash");

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _levelModel = require("./level-model");

var _levelModel2 = _interopRequireDefault(_levelModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var escapeRegex = function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

/* const getLevel = async (_, {id}, {user}) => { */
/*   const level = await Level.findById(id).exec() */
/*   if (!level) { */
/*     throw new Error("Cannot find level with id") */
/*   } */

/*   return level */
/* } */

var deleteLevel = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_, _ref2, ctx) {
    var id = _ref2.id;
    var level;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("id: ", id);
            _context.next = 3;
            return _levelModel2.default.findById(id).exec();

          case 3:
            level = _context.sent;

            if (level) {
              _context.next = 6;
              break;
            }

            throw new Error("No level found.");

          case 6:

            if (level.levelAuthor === id) {
              // TODO: delete level
            }

            return _context.abrupt("return", level);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function deleteLevel(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var updateLevel = function updateLevel(_, _ref3) {
  var input = _ref3.input;
  var id = input.id,
      update = (0, _objectWithoutProperties3.default)(input, ["id"]);

  return _levelModel2.default.findByIdAndUpdate(id, update, { new: true }).exec();
};

var levelCreate = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_, args, ctx, info) {
    var input, level;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("args: ", args);
            console.log("ctx: ", ctx.user);
            //TODO can't have duplicate level names
            input = args.input;

            input.levelAuthor = ctx.user;
            _context2.next = 6;
            return _levelModel2.default.create(input);

          case 6:
            level = _context2.sent;

            level.id = level._id;
            console.log("level: ", typeof level === "undefined" ? "undefined" : (0, _typeof3.default)(level));
            return _context2.abrupt("return", level);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function levelCreate(_x4, _x5, _x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

var getCreatedLevels = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_, args, ctx, info) {
    var query, cursorObj, cursor, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // build query object
            query = {};

            query.levelAuthor = ctx.user;
            // end query object

            /* // TODO: HOTFIX, using a fake levelAuthor, delete this after testing */
            /* query.levelAuthor = "5b9012f043aa4329f187f01a" */
            /* end */

            if (args.cursor) {
              // type cast id, $lt is not the same in aggregate vs query
              cursorObj = _mongoose2.default.Types.ObjectId(args.cursor);
              // add to query object

              cursor = cursorObj;

              query._id = { $lt: cursor };
            }

            _context3.next = 5;
            return _levelModel2.default.find(query).limit(3).sort({ _id: -1 }).exec();

          case 5:
            result = _context3.sent;

            if (!(0, _lodash.isEmpty)(result)) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", { levels: [], cursor: "done" });

          case 10:
            cursor = result[result.length - 1]._id;
            return _context3.abrupt("return", { levels: result, cursor: cursor });

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getCreatedLevels(_x8, _x9, _x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

var levelResolvers = exports.levelResolvers = {
  Query: {
    getCreatedLevels: getCreatedLevels
    /* getLevel */
  },
  Mutation: {
    deleteLevel: deleteLevel,
    updateLevel: updateLevel,
    levelCreate: levelCreate
  },
  Level: {
    levelAuthor: function levelAuthor(level) {
      var _this = this;

      return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var populated;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return level.populate("levelAuthor").execPopulate();

              case 2:
                populated = _context4.sent;
                return _context4.abrupt("return", populated.levelAuthor);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, _this);
      }))();
    }
  }
};
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(levelResolvers, "levelResolvers", "src/api/level/level-resolvers.js");
  reactHotLoader.register(escapeRegex, "escapeRegex", "src/api/level/level-resolvers.js");
  reactHotLoader.register(deleteLevel, "deleteLevel", "src/api/level/level-resolvers.js");
  reactHotLoader.register(updateLevel, "updateLevel", "src/api/level/level-resolvers.js");
  reactHotLoader.register(levelCreate, "levelCreate", "src/api/level/level-resolvers.js");
  reactHotLoader.register(getCreatedLevels, "getCreatedLevels", "src/api/level/level-resolvers.js");
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
  reactHotLoader.register(deleteLevel, "deleteLevel", "src/api/level/level-resolvers.js");
  reactHotLoader.register(updateLevel, "updateLevel", "src/api/level/level-resolvers.js");
  reactHotLoader.register(levelCreate, "levelCreate", "src/api/level/level-resolvers.js");
  reactHotLoader.register(getCreatedLevels, "getCreatedLevels", "src/api/level/level-resolvers.js");
  leaveModule(module);
})();

;