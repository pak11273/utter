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

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var escapeRegex = function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

var getApp = function () {
  var _ref3 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(_, _ref, _ref2) {
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

var getPixabayData = function () {
  var _ref5 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(_, args, _ref4) {
    var user, url, response, fetched;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = _ref4.user;
            console.log("args; ", args);
            url = "https://pixabay.com/api/?key=".concat(process.env.PIXABAY_API_KEY, "&q=admin&image_type=photo&pretty=true&per_page=").concat(encodeURIComponent(1));
            console.log("url: ", url);
            _context2.next = 6;
            return (0, _nodeFetch.default)(url);

          case 6:
            response = _context2.sent;
            _context2.next = 9;
            return response.json();

          case 9:
            fetched = _context2.sent;
            console.log("fetched: ", fetched);
            return _context2.abrupt("return", {
              rateLimit: "hello",
              remaining: "hi",
              reset: "bye"
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getPixabayData(_x4, _x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();

var appDelete = function () {
  var _ref7 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(_, _ref6, ctx) {
    var id, app;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = _ref6.id;
            console.log("id: ", id);
            _context3.next = 4;
            return _appModel.default.findById(id).exec();

          case 4:
            app = _context3.sent;

            if (app) {
              _context3.next = 7;
              break;
            }

            throw new Error("No app found.");

          case 7:
            if (app.appAuthor === id) {}

            return _context3.abrupt("return", app);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function appDelete(_x7, _x8, _x9) {
    return _ref7.apply(this, arguments);
  };
}();

var appUpdate = function appUpdate(_, _ref8) {
  var input = _ref8.input;
  var id = input.id,
      update = (0, _objectWithoutProperties2.default)(input, ["id"]);
  return _appModel.default.findByIdAndUpdate(id, update, {
    new: true
  }).exec();
};

var appCreate = function () {
  var _ref9 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4(_, args, ctx, info) {
    var input, app;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log("args: ", args);
            console.log("ctx: ", ctx.user);
            input = args.input;
            input.appAuthor = ctx.user;
            _context4.next = 6;
            return _appModel.default.create(input);

          case 6:
            app = _context4.sent;
            app.id = app._id;
            console.log("app: ", (0, _typeof2.default)(app));
            return _context4.abrupt("return", app);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function appCreate(_x10, _x11, _x12, _x13) {
    return _ref9.apply(this, arguments);
  };
}();

var getAppLevels = function () {
  var _ref10 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5(_, args, ctx, info) {
    var query;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            query = {};
            query.appAuthor = ctx.user;

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getAppLevels(_x14, _x15, _x16, _x17) {
    return _ref10.apply(this, arguments);
  };
}();

var getCreatedApps = function () {
  var _ref11 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee6(_, args, ctx, info) {
    var query, cursorObj, cursor, result;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            query = {};
            query.appAuthor = ctx.user;

            if (args.cursor) {
              cursorObj = _mongoose.default.Types.ObjectId(args.cursor);
              cursor = cursorObj;
              query._id = {
                $lt: cursor
              };
            }

            _context6.next = 5;
            return _appModel.default.find(query).limit(3).sort({
              _id: -1
            }).exec();

          case 5:
            result = _context6.sent;

            if (!(0, _lodash.isEmpty)(result)) {
              _context6.next = 10;
              break;
            }

            return _context6.abrupt("return", {
              apps: [],
              cursor: "done"
            });

          case 10:
            cursor = result[result.length - 1]._id;
            return _context6.abrupt("return", {
              apps: result,
              cursor: cursor
            });

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getCreatedApps(_x18, _x19, _x20, _x21) {
    return _ref11.apply(this, arguments);
  };
}();

var getApps = function () {
  var _ref12 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee7(_, args, ctx, info) {
    var query, appName, appRef, appAuthor, cursor, result;
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            query = {};
            args.title ? query.appName = new RegExp(escapeRegex(args.title), "gi") : null;
            args.ref ? query.appRef = new RegExp(escapeRegex(args.ref), "gi") : null;

            if (!args.author) {
              _context7.next = 7;
              break;
            }

            _context7.next = 6;
            return _appModel.default.findByUsername(args.author, function (err, docs) {
              if (err) {}

              if (!(0, _lodash.isEmpty)(docs)) {
                var appAuthor = docs._id;
                query.appAuthor = appAuthor;
              }
            });

          case 6:
            appAuthor = _context7.sent;

          case 7:
            args.usingLang ? query.usingLang = new RegExp(escapeRegex(args.usingLang), "gi") : null;
            args.teachingLang ? query.teachingLang = new RegExp(escapeRegex(args.teachingLang), "gi") : null;

            if (args.cursor) {
              cursor = _mongoose.default.Types.ObjectId(args.cursor);
              query._id = {
                $lt: cursor
              };
            }

            _context7.next = 12;
            return _appModel.default.find(query).limit(3).sort({
              _id: -1
            }).exec();

          case 12:
            result = _context7.sent;

            if (!(0, _lodash.isEmpty)(result)) {
              _context7.next = 18;
              break;
            }

            console.log("done");
            return _context7.abrupt("return", {
              apps: [],
              cursor: "done"
            });

          case 18:
            cursor = result[result.length - 1]._id;
            return _context7.abrupt("return", {
              apps: result,
              cursor: cursor
            });

          case 20:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getApps(_x22, _x23, _x24, _x25) {
    return _ref12.apply(this, arguments);
  };
}();

var appResolvers = {
  Query: {
    getPixabayData: getPixabayData,
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
      var _appAuthor = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee8(app) {
        var populated;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return app.populate("appAuthor").execPopulate();

              case 2:
                populated = _context8.sent;
                return _context8.abrupt("return", populated.appAuthor);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function appAuthor(_x26) {
        return _appAuthor.apply(this, arguments);
      }

      return appAuthor;
    }()
  }
};
exports.appResolvers = appResolvers;