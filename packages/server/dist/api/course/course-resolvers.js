"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.courseResolvers = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _config = _interopRequireDefault(require("../../config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _courseModel = _interopRequireDefault(require("./course-model"));

var _userModel = _interopRequireDefault(require("../user/user-model.js"));

var _resolverFunctions = require("../shared/resolver-functions.js");

var _this = void 0;

var escapeRegex = function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
/* 
** 
** @coursesById
**
** usage: 
** coursesById(courseIds) => {} 
**
** return: Given an array of course ids this will return an array of coureses that contain at least one of those ids.  
**
** notes: 
**
*/


var coursesById =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(courseIds) {
    var courses;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _courseModel.default.find({
              _id: {
                $in: courseIds
              }
            }).lean();

          case 3:
            courses = _context.sent;
            return _context.abrupt("return", courses.map(function (course) {
              return (0, _objectSpread2.default)({}, course, {
                owner: userById.bind(_this, course.owner)
              });
            }));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function coursesById(_x) {
    return _ref.apply(this, arguments);
  };
}();
/* 
** 
** @mongooseToJs
**
** usage: 
** mongooseToJs(object) => {} 
**
** return: A new js object with a stringified _id and an owner Id.  The object to convert must have an owner property.
**
** notes: converts a mongoose object to a plain js object discarding mongoose meta data.   
**
*/


var mongooseToJs = function mongooseToJs(object) {
  return (0, _objectSpread2.default)({}, object._doc, {
    _id: object._doc._id.toString(),
    owner: userById.bind(_this, object._doc.owner)
  });
};
/* 
** 
** @userById
**
** usage: 
** userById(userId) => {} 
**
** return: 
**
** notes: 
**
*/


var userById =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(userId) {
    var user;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("userId: ", userId);
            _context2.prev = 1;
            _context2.next = 4;
            return _userModel.default.findById(userId).lean();

          case 4:
            user = _context2.sent;
            console.log("user: ", user);

            if (!user) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", (0, _objectSpread2.default)({}, user, {
              createdCourses: coursesById.bind(_this, user.createdCourses)
            }));

          case 8:
            return _context2.abrupt("return", {
              username: ""
            });

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](1);
            throw _context2.t0;

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 11]]);
  }));

  return function userById(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getCourse =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(_, args, _ref3) {
    var user, course;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            user = _ref3.user;
            _context3.next = 3;
            return _courseModel.default.findById(args._id).lean().exec();

          case 3:
            course = _context3.sent;

            if (course) {
              _context3.next = 6;
              break;
            }

            throw new Error("Cannot find course with id");

          case 6:
            return _context3.abrupt("return", course);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getCourse(_x3, _x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

var courseDelete =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(_, _ref5, ctx) {
    var id, token, user, course;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = _ref5.id;

            if (!(token === "null")) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", new Error("You need to be registered to delete this resource."));

          case 3:
            token = ctx.req.headers.authorization;
            _context4.next = 6;
            return (0, _resolverFunctions.userByToken)(token, function (err, res) {
              if (err) return err;
              return res;
            });

          case 6:
            user = _context4.sent;
            _context4.next = 9;
            return _courseModel.default.findOneAndDelete({
              owner: user._id
            });

          case 9:
            course = _context4.sent;

            if (course) {
              _context4.next = 12;
              break;
            }

            throw new Error("No course found by this owner.");

          case 12:
            if (!course) {
              _context4.next = 14;
              break;
            }

            return _context4.abrupt("return", true);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function courseDelete(_x6, _x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();

var courseUpdate =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(_, args, ctx) {
    var _id, update, result;

    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;

            if (ctx.isAuth) {
              _context5.next = 3;
              break;
            }

            return _context5.abrupt("return", new Error("You need to be registered to edit this course."));

          case 3:
            console.log("input: ", args);
            _id = args._id, update = (0, _objectWithoutProperties2.default)(args, ["_id"]);
            _context5.next = 7;
            return _courseModel.default.findByIdAndUpdate(_id, update, {
              new: true
            }).lean();

          case 7:
            result = _context5.sent;

            /* .exec() */
            console.log("result: ", result);
            _context5.next = 14;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](0);
            throw _context5.t0;

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 11]]);
  }));

  return function courseUpdate(_x9, _x10, _x11) {
    return _ref7.apply(this, arguments);
  };
}();

var courseCreate =
/*#__PURE__*/
function () {
  var _ref8 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee6(_, args, ctx, info) {
    var userId, user, newCourse, createdCourse, course, owner;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log("args: ", args);
            _context6.prev = 1;

            if (ctx.isAuth) {
              _context6.next = 4;
              break;
            }

            throw new Error("You need to be registered to create a course.");

          case 4:
            userId = ctx.req.token._id;
            _context6.next = 7;
            return _userModel.default.findById(userId, function (err, res) {
              if (err) return err;
              return res;
            });

          case 7:
            user = _context6.sent;
            newCourse = new _courseModel.default({
              courseImage: args.input.courseImage,
              courseName: args.input.courseName,
              courseDescription: args.input.courseDescription,
              courseMode: args.input.courseMode,
              resources: args.input.resources,
              teachingLang: args.input.teachingLang,
              usingLang: args.input.usingLang,
              owner: user._id
            });
            _context6.next = 11;
            return newCourse.save();

          case 11:
            course = _context6.sent;

            /* createdCourse = mongooseToJs(course) */
            createdCourse = (0, _objectSpread2.default)({}, course._doc, {
              _id: course._doc._id.toString(),
              owner: userById.bind(_this, course._doc.owner)
            });
            _context6.next = 15;
            return _userModel.default.findById(userId);

          case 15:
            owner = _context6.sent;

            if (owner) {
              _context6.next = 18;
              break;
            }

            throw new Error("User not found.");

          case 18:
            owner.createdCourses.push(course);
            _context6.next = 21;
            return owner.save();

          case 21:
            return _context6.abrupt("return", createdCourse);

          case 24:
            _context6.prev = 24;
            _context6.t0 = _context6["catch"](1);
            throw _context6.t0;

          case 27:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 24]]);
  }));

  return function courseCreate(_x12, _x13, _x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();

var getCourseLevels =
/*#__PURE__*/
function () {
  var _ref9 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee7(_, args, ctx, info) {
    var query;
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            // build query object
            query = {};
            query.owner = ctx.user;

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getCourseLevels(_x16, _x17, _x18, _x19) {
    return _ref9.apply(this, arguments);
  };
}();

var getCreatedCourses =
/*#__PURE__*/
function () {
  var _ref10 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee8(_, args, ctx, info) {
    var token, user, query, cursorObj, cursor, courses, convertedCourses, lastCourse;
    return _regenerator.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;

            if (ctx.isAuth) {
              _context8.next = 3;
              break;
            }

            return _context8.abrupt("return", new Error("You need to be registered to create a course."));

          case 3:
            token = ctx.req.headers.authorization;
            _context8.next = 6;
            return (0, _resolverFunctions.userByToken)(token, function (err, res) {
              if (err) return err;
              return res;
            });

          case 6:
            user = _context8.sent;
            // build query object
            query = {};
            query.owner = user._id; // end query object

            if (args.cursor && args.cursor !== "done") {
              // type cast id, $lt is not the same in aggregate vs query
              cursorObj = _mongoose.default.Types.ObjectId(args.cursor); // add to query object

              cursor = cursorObj;
              query._id = {
                $lt: cursor
              };
            }

            _context8.next = 12;
            return _courseModel.default.find(query).lean()
            /* .limit(3) */
            .sort({
              _id: -1
            });

          case 12:
            courses = _context8.sent;

            if (!(0, _isEmpty.default)(courses)) {
              _context8.next = 15;
              break;
            }

            return _context8.abrupt("return", {
              courses: [],
              cursor: "done"
            });

          case 15:
            convertedCourses = courses.map(function (course) {
              return (0, _objectSpread2.default)({}, course, {
                owner: userById.bind(_this, course.owner)
              });
            });
            _context8.next = 18;
            return _courseModel.default.findOne().sort({
              field: "asc",
              _id: 1
            });

          case 18:
            lastCourse = _context8.sent;
            //TODO: index?
            cursor = convertedCourses[convertedCourses.length - 1]._id;

            if (!((0, _isEmpty.default)(convertedCourses) || lastCourse._doc._id.toString() === cursor)) {
              _context8.next = 24;
              break;
            }

            return _context8.abrupt("return", {
              courses: convertedCourses,
              cursor: "done"
            });

          case 24:
            return _context8.abrupt("return", {
              courses: convertedCourses,
              cursor: cursor
            });

          case 25:
            _context8.next = 30;
            break;

          case 27:
            _context8.prev = 27;
            _context8.t0 = _context8["catch"](0);
            throw _context8.t0;

          case 30:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 27]]);
  }));

  return function getCreatedCourses(_x20, _x21, _x22, _x23) {
    return _ref10.apply(this, arguments);
  };
}();

var getCourses =
/*#__PURE__*/
function () {
  var _ref11 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee9(_, args, ctx, info) {
    var courses, convertedCourses;
    return _regenerator.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _courseModel.default.find().lean();

          case 3:
            courses = _context9.sent;
            convertedCourses = courses.map(function (course) {
              return (0, _objectSpread2.default)({}, course, {
                owner: userById.bind(_this, course.owner)
              });
            });
            return _context9.abrupt("return", {
              courses: convertedCourses,
              cursor: ""
            });

          case 8:
            _context9.prev = 8;
            _context9.t0 = _context9["catch"](0);
            throw _context9.t0;

          case 11:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 8]]);
  }));

  return function getCourses(_x24, _x25, _x26, _x27) {
    return _ref11.apply(this, arguments);
  };
}();

var subscribe =
/*#__PURE__*/
function () {
  var _ref12 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee10(_, args, ctx, info) {
    var course, userId, user, result;
    return _regenerator.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _courseModel.default.findOneAndUpdate({
              _id: args.courseId
            }, {
              $inc: {
                subscribers: 1
              }
            });

          case 2:
            course = _context10.sent;
            userId = ctx.req.token._id;
            _context10.prev = 4;
            _context10.next = 7;
            return _userModel.default.findById(userId, function (err, res) {
              if (err) return err;
              return res;
            });

          case 7:
            user = _context10.sent;
            user.subscriptions.push(course);
            _context10.next = 11;
            return user.save();

          case 11:
            result = _context10.sent;

            if (!result) {
              _context10.next = 14;
              break;
            }

            return _context10.abrupt("return", course);

          case 14:
            _context10.next = 19;
            break;

          case 16:
            _context10.prev = 16;
            _context10.t0 = _context10["catch"](4);
            throw _context10.t0;

          case 19:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[4, 16]]);
  }));

  return function subscribe(_x28, _x29, _x30, _x31) {
    return _ref12.apply(this, arguments);
  };
}();

var unsubscribe =
/*#__PURE__*/
function () {
  var _ref13 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee11(_, args, ctx, info) {
    var course, userId, user, result;
    return _regenerator.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _courseModel.default.findOneAndUpdate({
              _id: args.courseId,
              subscribers: {
                $gte: 1
              }
            }, {
              $inc: {
                subscribers: -1
              }
            });

          case 2:
            course = _context11.sent;
            userId = ctx.req.token._id;
            _context11.prev = 4;
            _context11.next = 7;
            return _userModel.default.findById(userId, function (err, res) {
              if (err) return err;
              return res;
            });

          case 7:
            user = _context11.sent;
            user.subscriptions.pull(course);
            _context11.next = 11;
            return user.save();

          case 11:
            result = _context11.sent;

            if (!result) {
              _context11.next = 14;
              break;
            }

            return _context11.abrupt("return", true);

          case 14:
            _context11.next = 19;
            break;

          case 16:
            _context11.prev = 16;
            _context11.t0 = _context11["catch"](4);
            throw _context11.t0;

          case 19:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[4, 16]]);
  }));

  return function unsubscribe(_x32, _x33, _x34, _x35) {
    return _ref13.apply(this, arguments);
  };
}();

var courseResolvers = {
  Query: {
    getCreatedCourses: getCreatedCourses,
    getCourses: getCourses,
    getCourse: getCourse,
    getCourseLevels: getCourseLevels
  },
  Mutation: {
    courseDelete: courseDelete,
    courseUpdate: courseUpdate,
    courseCreate: courseCreate,
    subscribe: subscribe,
    unsubscribe: unsubscribe
    /* Course: { */

    /*   async owner(course) { */

    /*     const populated = await course.populate("owner").execPopulate() */

    /*     return populated.owner */

    /*   } */

    /* } */

  }
};
exports.courseResolvers = courseResolvers;