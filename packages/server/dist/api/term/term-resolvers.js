"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.courseResolvers = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _termModel = _interopRequireDefault(require("./term-model"));

var escapeRegex = function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

var getTerm = function () {
  var _ref3 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(_, _ref, _ref2) {
    var id, user, course;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = _ref.id;
            user = _ref2.user;
            _context.next = 4;
            return _termModel.default.findById(id).exec();

          case 4:
            course = _context.sent;

            if (course) {
              _context.next = 7;
              break;
            }

            throw new Error("Cannot find course with id");

          case 7:
            return _context.abrupt("return", course);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getTerm(_x, _x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

var deleteTerm = function () {
  var _ref5 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(_, _ref4, ctx) {
    var id, course;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = _ref4.id;
            console.log("id: ", id);
            _context2.next = 4;
            return _termModel.default.findById(id).exec();

          case 4:
            course = _context2.sent;

            if (course) {
              _context2.next = 7;
              break;
            }

            throw new Error("No course found.");

          case 7:
            if (course.owner === id) {}

            return _context2.abrupt("return", course);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function deleteTerm(_x4, _x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();

var updateTerm = function updateTerm(_, _ref6) {
  var input = _ref6.input;
  var id = input.id,
      update = (0, _objectWithoutProperties2.default)(input, ["id"]);
  return _termModel.default.findByIdAndUpdate(id, update, {
    new: true
  }).exec();
};

var courseCreate = function () {
  var _ref7 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(_, args, ctx, info) {
    var input, course;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log("args: ", args);
            console.log("ctx: ", ctx.user);
            input = args.input;
            input.owner = ctx.user;
            _context3.next = 6;
            return _termModel.default.create(input);

          case 6:
            course = _context3.sent;
            course.id = course._id;
            console.log("course: ", (0, _typeof2.default)(course));
            return _context3.abrupt("return", course);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function courseCreate(_x7, _x8, _x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();

var getCreatedTerms = function () {
  var _ref8 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4(_, args, ctx, info) {
    var query, cursorObj, cursor, result;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            query = {};
            query.owner = ctx.user;

            if (args.cursor) {
              cursorObj = _mongoose.default.Types.ObjectId(args.cursor);
              cursor = cursorObj;
              query._id = {
                $lt: cursor
              };
            }

            _context4.next = 5;
            return _termModel.default.find(query).limit(3).sort({
              _id: -1
            }).exec();

          case 5:
            result = _context4.sent;

            if (!(0, _lodash.isEmpty)(result)) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", {
              courses: [],
              cursor: "done"
            });

          case 10:
            cursor = result[result.length - 1]._id;
            return _context4.abrupt("return", {
              courses: result,
              cursor: cursor
            });

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getCreatedTerms(_x11, _x12, _x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();

var getTerms = function () {
  var _ref9 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5(_, args, ctx, info) {
    var query, courseName, resources, owner, cursor, result;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            query = {};
            args.title ? query.courseName = new RegExp(escapeRegex(args.title), "gi") : null;
            args.ref ? query.resources = new RegExp(escapeRegex(args.ref), "gi") : null;

            if (!args.author) {
              _context5.next = 7;
              break;
            }

            _context5.next = 6;
            return _termModel.default.findByUsername(args.author, function (err, docs) {
              if (err) {}

              if (!(0, _lodash.isEmpty)(docs)) {
                var owner = docs._id;
                query.owner = owner;
              }
            });

          case 6:
            owner = _context5.sent;

          case 7:
            args.usingLang ? query.usingLang = new RegExp(escapeRegex(args.usingLang), "gi") : null;
            args.teachingLang ? query.teachingLang = new RegExp(escapeRegex(args.teachingLang), "gi") : null;

            if (args.cursor) {
              cursor = _mongoose.default.Types.ObjectId(args.cursor);
              query._id = {
                $lt: cursor
              };
            }

            _context5.next = 12;
            return _termModel.default.find(query).limit(3).sort({
              _id: -1
            }).exec();

          case 12:
            result = _context5.sent;

            if (!(0, _lodash.isEmpty)(result)) {
              _context5.next = 18;
              break;
            }

            console.log("done");
            return _context5.abrupt("return", {
              courses: [],
              cursor: "done"
            });

          case 18:
            cursor = result[result.length - 1]._id;
            return _context5.abrupt("return", {
              courses: result,
              cursor: cursor
            });

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getTerms(_x15, _x16, _x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

var courseResolvers = {
  Query: {
    getCreatedTerms: getCreatedTerms,
    getTerms: getTerms,
    getTerm: getTerm
  },
  Mutation: {
    deleteTerm: deleteTerm,
    updateTerm: updateTerm,
    courseCreate: courseCreate
  },
  Term: {
    owner: function () {
      var _owner = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee6(course) {
        var populated;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return course.populate("owner").execPopulate();

              case 2:
                populated = _context6.sent;
                return _context6.abrupt("return", populated.owner);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function owner(_x19) {
        return _owner.apply(this, arguments);
      }

      return owner;
    }()
  }
};
exports.courseResolvers = courseResolvers;