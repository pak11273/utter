"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.courseResolvers = undefined;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = require("lodash");

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _termModel = require("./term-model");

var _termModel2 = _interopRequireDefault(_termModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var escapeRegex = function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

var getTerm = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_, _ref2, _ref3) {
    var id = _ref2.id;
    var user = _ref3.user;
    var course;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _termModel2.default.findById(id).exec();

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

  return function getTerm(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var deleteTerm = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_, _ref5, ctx) {
    var id = _ref5.id;
    var course;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("id: ", id);
            _context2.next = 3;
            return _termModel2.default.findById(id).exec();

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

  return function deleteTerm(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var updateTerm = function updateTerm(_, _ref6) {
  var input = _ref6.input;
  var id = input.id,
      update = (0, _objectWithoutProperties3.default)(input, ["id"]);

  return _termModel2.default.findByIdAndUpdate(id, update, { new: true }).exec();
};

var courseCreate = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_, args, ctx, info) {
    var input, course;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log("args: ", args);
            console.log("ctx: ", ctx.user);
            //TODO can't have duplicate course names
            input = args.input;

            input.courseAuthor = ctx.user;
            _context3.next = 6;
            return _termModel2.default.create(input);

          case 6:
            course = _context3.sent;

            course.id = course._id;
            console.log("course: ", typeof course === "undefined" ? "undefined" : (0, _typeof3.default)(course));
            return _context3.abrupt("return", course);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function courseCreate(_x7, _x8, _x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();

var getCreatedTerms = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_, args, ctx, info) {
    var query, cursorObj, cursor, result;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // build query object
            query = {};

            query.courseAuthor = ctx.user;
            // end query object

            /* // TODO: HOTFIX, using a fake courseAuthor, delete this after testing */
            /* query.courseAuthor = "5b9012f043aa4329f187f01a" */
            /* end */

            if (args.cursor) {
              // type cast id, $lt is not the same in aggregate vs query
              cursorObj = _mongoose2.default.Types.ObjectId(args.cursor);
              // add to query object

              cursor = cursorObj;

              query._id = { $lt: cursor };
            }

            _context4.next = 5;
            return _termModel2.default.find(query).limit(3).sort({ _id: -1 }).exec();

          case 5:
            result = _context4.sent;

            if (!(0, _lodash.isEmpty)(result)) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", { courses: [], cursor: "done" });

          case 10:
            cursor = result[result.length - 1]._id;
            return _context4.abrupt("return", { courses: result, cursor: cursor });

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getCreatedTerms(_x11, _x12, _x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();

var getTerms = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_, args, ctx, info) {
    var query, courseName, courseRef, courseAuthor, cursor, result;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // build query object
            query = {};


            args.title ? query.courseName = new RegExp(escapeRegex(args.title), "gi") : null;

            args.ref ? query.courseRef = new RegExp(escapeRegex(args.ref), "gi") : null;

            if (!args.author) {
              _context5.next = 7;
              break;
            }

            _context5.next = 6;
            return _termModel2.default.findByUsername(args.author, function (err, docs) {
              if (err) {
                // console.log doesn't work here
              }
              if (!(0, _lodash.isEmpty)(docs)) {
                var courseAuthor = docs._id;
                query.courseAuthor = courseAuthor;
              }
            });

          case 6:
            courseAuthor = _context5.sent;

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

            _context5.next = 12;
            return _termModel2.default.find(query).limit(3).sort({ _id: -1 }).exec();

          case 12:
            result = _context5.sent;

            if (!(0, _lodash.isEmpty)(result)) {
              _context5.next = 18;
              break;
            }

            console.log("done");
            return _context5.abrupt("return", { courses: [], cursor: "done" });

          case 18:
            cursor = result[result.length - 1]._id;
            return _context5.abrupt("return", { courses: result, cursor: cursor });

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function getTerms(_x15, _x16, _x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

var courseResolvers = exports.courseResolvers = {
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
    courseAuthor: function courseAuthor(course) {
      var _this = this;

      return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        var populated;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return course.populate("courseAuthor").execPopulate();

              case 2:
                populated = _context6.sent;
                return _context6.abrupt("return", populated.courseAuthor);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, _this);
      }))();
    }
  }
};