"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.courseResolvers = undefined;

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _courseModel = require("./course-model");

var _courseModel2 = _interopRequireDefault(_courseModel);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var escapeRegex = function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

var getCourse = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_, _ref2, _ref3) {
    var id = _ref2.id;
    var user = _ref3.user;
    var course;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _courseModel2.default.findById(id).exec();

          case 2:
            course = _context.sent;

            if (course) {
              _context.next = 5;
              break;
            }

            throw new Error("Cannot find course with id");

          case 5:
            return _context.abrupt("return", course);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getCourse(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var deleteCourse = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_, _ref5, ctx) {
    var id = _ref5.id;
    var course;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("id: ", id);
            _context2.next = 3;
            return _courseModel2.default.findById(id).exec();

          case 3:
            course = _context2.sent;

            if (course) {
              _context2.next = 6;
              break;
            }

            throw new Error("No course found.");

          case 6:

            if (course.courseAuthor === id) {
              // TODO: delete course
            }

            return _context2.abrupt("return", course);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function deleteCourse(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var updateCourse = function updateCourse(_, _ref6) {
  var input = _ref6.input;
  var id = input.id,
      update = (0, _objectWithoutProperties3.default)(input, ["id"]);

  return _courseModel2.default.findByIdAndUpdate(id, update, { new: true }).exec();
};

var createCourse = function createCourse(_, args) {
  var input = args.input;

  return _courseModel2.default.create(input);
};

var getCreatedCourses = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_, args, ctx, info) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log("ctx: ", ctx.req);
            console.log("user: ", ctx.user);
            return _context3.abrupt("return", { courses: [], cursor: "hello" });

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getCreatedCourses(_x7, _x8, _x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();

var getCourses = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_, args, ctx, info) {
    var query, courseName, courseRef, courseAuthor, cursor, result;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // build query object
            query = {};


            args.title ? query.courseName = new RegExp(escapeRegex(args.title), "gi") : null;

            args.ref ? query.courseRef = new RegExp(escapeRegex(args.ref), "gi") : null;

            if (!args.author) {
              _context4.next = 7;
              break;
            }

            _context4.next = 6;
            return _courseModel2.default.findByUsername(args.author, function (err, docs) {
              if (err) {
                // console.log doesn't work here
              }
              if (!(0, _isEmpty2.default)(docs)) {
                var courseAuthor = docs._id;
                query.courseAuthor = courseAuthor;
              }
            });

          case 6:
            courseAuthor = _context4.sent;

          case 7:

            args.usingLang ? query.usingLang = new RegExp(escapeRegex(args.usingLang), "gi") : null;

            args.teachingLang ? query.teachingLang = new RegExp(escapeRegex(args.teachingLang), "gi") : null;
            // end query object

            if (args.cursor) {
              // type cast id, $lt is not the same in aggregate vs query
              cursor = _mongoose2.default.Types.ObjectId(args.cursor);
              // add to query object

              query._id = { $lt: cursor };
            }

            _context4.next = 12;
            return _courseModel2.default.find(query).limit(3).sort({ _id: -1 }).exec();

          case 12:
            result = _context4.sent;

            if (!(0, _isEmpty2.default)(result)) {
              _context4.next = 18;
              break;
            }

            console.log("done");
            return _context4.abrupt("return", { courses: [], cursor: "done" });

          case 18:
            cursor = result[result.length - 1]._id;
            return _context4.abrupt("return", { courses: result, cursor: cursor });

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getCourses(_x11, _x12, _x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();

var courseResolvers = exports.courseResolvers = {
  Query: {
    getCreatedCourses: getCreatedCourses,
    getCourses: getCourses,
    getCourse: getCourse
  },
  Mutation: {
    deleteCourse: deleteCourse,
    updateCourse: updateCourse,
    createCourse: createCourse
  },
  Course: {
    courseAuthor: function courseAuthor(course) {
      var _this = this;

      return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        var populated;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return course.populate("courseAuthor").execPopulate();

              case 2:
                populated = _context5.sent;
                return _context5.abrupt("return", populated.courseAuthor);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, _this);
      }))();
    }
  }
};