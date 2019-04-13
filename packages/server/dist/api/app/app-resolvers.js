"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appResolvers = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _appModel = _interopRequireDefault(require("./app-model"));

var escapeRegex = function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

var getApp =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_, _ref, _ref2) {
    var appId, user, app;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            appId = _ref.appId;
            user = _ref2.user;
            console.log("appId: ", appId);
            _context.next = 5;
            return _appModel.default.findById(appId).exec();

          case 5:
            app = _context.sent;

            if (app) {
              _context.next = 8;
              break;
            }

            throw new Error("Cannot find app with id");

          case 8:
            return _context.abrupt("return", app);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getApp(_x, _x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

var appDelete =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(_, _ref4, ctx) {
    var id, app;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = _ref4.id;
            console.log("id: ", id);
            _context2.next = 4;
            return _appModel.default.findById(id).exec();

          case 4:
            app = _context2.sent;

            if (app) {
              _context2.next = 7;
              break;
            }

            throw new Error("No app found.");

          case 7:
            if (app.appAuthor === id) {// TODO: delete app
            }

            return _context2.abrupt("return", app);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function appDelete(_x4, _x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();

var appUpdate = function appUpdate(_, _ref6) {
  var input = _ref6.input;
  var id = input.id,
      update = (0, _objectWithoutProperties2.default)(input, ["id"]);
  return _appModel.default.findByIdAndUpdate(id, update, {
    new: true
  }).exec();
};

var appCreate =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(_, args, ctx, info) {
    var input, app;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log("args: ", args);
            console.log("ctx: ", ctx.user); //TODO can't have duplicate app names

            input = args.input;
            input.appAuthor = ctx.user;
            _context3.next = 6;
            return _appModel.default.create(input);

          case 6:
            app = _context3.sent;
            app.id = app._id;
            console.log("app: ", (0, _typeof2.default)(app));
            return _context3.abrupt("return", app);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function appCreate(_x7, _x8, _x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();

var getAppLevels =
/*#__PURE__*/
function () {
  var _ref8 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(_, args, ctx, info) {
    var query;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // build query object
            query = {};
            query.appAuthor = ctx.user;

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getAppLevels(_x11, _x12, _x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();

var getCreatedApps =
/*#__PURE__*/
function () {
  var _ref9 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(_, args, ctx, info) {
    var query, cursorObj, cursor, result;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // build query object
            query = {};
            query.appAuthor = ctx.user; // end query object

            /* // TODO: HOTFIX, using a fake appAuthor, delete this after testing */

            /* query.appAuthor = "5b9012f043aa4329f187f01a" */

            /* end */

            if (args.cursor) {
              // type cast id, $lt is not the same in aggregate vs query
              cursorObj = _mongoose.default.Types.ObjectId(args.cursor); // add to query object

              cursor = cursorObj;
              query._id = {
                $lt: cursor
              };
            }

            _context5.next = 5;
            return _appModel.default.find(query).limit(3).sort({
              _id: -1
            }).exec();

          case 5:
            result = _context5.sent;

            if (!(0, _lodash.isEmpty)(result)) {
              _context5.next = 10;
              break;
            }

            return _context5.abrupt("return", {
              apps: [],
              cursor: "done"
            });

          case 10:
            cursor = result[result.length - 1]._id;
            return _context5.abrupt("return", {
              apps: result,
              cursor: cursor
            });

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getCreatedApps(_x15, _x16, _x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

var getApps =
/*#__PURE__*/
function () {
  var _ref10 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee6(_, args, ctx, info) {
    var query, appName, appRef, appAuthor, cursor, result;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            // build query object
            query = {};
            args.title ? query.appName = new RegExp(escapeRegex(args.title), "gi") : null;
            args.ref ? query.appRef = new RegExp(escapeRegex(args.ref), "gi") : null;

            if (!args.author) {
              _context6.next = 7;
              break;
            }

            _context6.next = 6;
            return _appModel.default.findByUsername(args.author, function (err, docs) {
              if (err) {}

              if (!(0, _lodash.isEmpty)(docs)) {
                var appAuthor = docs._id;
                query.appAuthor = appAuthor;
              }
            });

          case 6:
            appAuthor = _context6.sent;

          case 7:
            args.usingLang ? query.usingLang = new RegExp(escapeRegex(args.usingLang), "gi") : null;
            args.teachingLang ? query.teachingLang = new RegExp(escapeRegex(args.teachingLang), "gi") : null; // end query object

            if (args.cursor) {
              // type cast id, $lt is not the same in aggregate vs query
              cursor = _mongoose.default.Types.ObjectId(args.cursor); // add to query object

              query._id = {
                $lt: cursor
              };
            }

            _context6.next = 12;
            return _appModel.default.find(query).limit(3).sort({
              _id: -1
            }).exec();

          case 12:
            result = _context6.sent;

            if (!(0, _lodash.isEmpty)(result)) {
              _context6.next = 18;
              break;
            }

            console.log("done");
            return _context6.abrupt("return", {
              apps: [],
              cursor: "done"
            });

          case 18:
            cursor = result[result.length - 1]._id;
            return _context6.abrupt("return", {
              apps: result,
              cursor: cursor
            });

          case 20:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getApps(_x19, _x20, _x21, _x22) {
    return _ref10.apply(this, arguments);
  };
}();

var appResolvers = {
  Query: {
    getCreatedApps: getCreatedApps,
    getApps: getApps,
    getApp: getApp,
    getAppLevels: getAppLevels
  },
  Mutation: {
    appDelete: appDelete,
    appUpdate: appUpdate,
    appCreate: appCreate
  },
  App: {
    appAuthor: function () {
      var _appAuthor = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee7(app) {
        var populated;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return app.populate("appAuthor").execPopulate();

              case 2:
                populated = _context7.sent;
                return _context7.abrupt("return", populated.appAuthor);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function appAuthor(_x23) {
        return _appAuthor.apply(this, arguments);
      }

      return appAuthor;
    }()
  }
};
exports.appResolvers = appResolvers;