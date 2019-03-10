"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.courseResolvers = undefined;

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _courseModel = require("./course-model");

var _courseModel2 = _interopRequireDefault(_courseModel);

var _userModel = require("../user/user-model.js");

var _userModel2 = _interopRequireDefault(_userModel);

var _resolverFunctions = require("../shared/resolver-functions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var coursesById = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(courseIds) {
    var courses;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _courseModel2.default.find({ _id: { $in: courseIds } });

          case 3:
            courses = _context.sent;
            return _context.abrupt("return", courses.map(function (course) {
              return (0, _extends3.default)({}, course._doc, {
                _id: course.id,
                owner: userById.bind(undefined, course.owner)
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
    }, _callee, undefined, [[0, 7]]);
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
  return (0, _extends3.default)({}, object._doc, {
    _id: object._doc._id.toString(),
    owner: userById.bind(undefined, object._doc.owner)
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

var userById = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(userId) {
    var user;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _userModel2.default.findById(userId);

          case 3:
            user = _context2.sent;
            return _context2.abrupt("return", (0, _extends3.default)({}, user._doc, {
              _id: user.id,
              createdCourses: coursesById.bind(undefined, user._doc.createdCourses)
            }));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function userById(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getCourse = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_, _ref4, _ref5) {
    var courseId = _ref4.courseId;
    var user = _ref5.user;
    var course;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _courseModel2.default.findById(courseId).exec();

          case 2:
            course = _context3.sent;

            if (course) {
              _context3.next = 5;
              break;
            }

            throw new Error("Cannot find course with id");

          case 5:
            return _context3.abrupt("return", course);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getCourse(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var courseDelete = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_, _ref7, ctx) {
    var id = _ref7.id;
    var token, user, course;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(token === "null")) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", new Error("You need to be registered to view this resource."));

          case 2:
            token = ctx.req.headers.authorization;
            _context4.next = 5;
            return (0, _resolverFunctions.userByToken)(token, function (err, res) {
              if (err) return err;
              return res;
            });

          case 5:
            user = _context4.sent;
            _context4.next = 8;
            return _courseModel2.default.findOneAndDelete({ owner: user._id });

          case 8:
            course = _context4.sent;

            if (course) {
              _context4.next = 11;
              break;
            }

            throw new Error("No course found by this owner.");

          case 11:
            if (!course) {
              _context4.next = 13;
              break;
            }

            return _context4.abrupt("return", true);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function courseDelete(_x6, _x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();

var courseUpdate = function courseUpdate(_, _ref8) {
  var input = _ref8.input;
  var id = input.id,
      update = (0, _objectWithoutProperties3.default)(input, ["id"]);

  return _courseModel2.default.findByIdAndUpdate(id, update, { new: true }).exec();
};

var courseCreate = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_, args, ctx, info) {
    var userId, user, newCourse, createdCourse, course, owner;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;

            if (ctx.isAuth) {
              _context5.next = 3;
              break;
            }

            throw new Error("You need to be registered to create a course.");

          case 3:
            userId = ctx.req.token._id;
            _context5.next = 6;
            return _userModel2.default.findById(userId, function (err, res) {
              if (err) return err;
              return res;
            });

          case 6:
            user = _context5.sent;
            newCourse = new _courseModel2.default({
              courseImage: args.input.courseImage,
              courseName: args.input.courseName,
              courseDescription: args.input.courseDescription,
              courseMode: args.input.courseMode,
              resources: args.input.resources,
              teachingLang: args.input.teachingLang,
              usingLang: args.input.usingLang,
              owner: user._id
            });
            createdCourse = void 0;
            _context5.next = 11;
            return newCourse.save();

          case 11:
            course = _context5.sent;


            /* createdCourse = mongooseToJs(course) */

            createdCourse = (0, _extends3.default)({}, course._doc, {
              _id: course._doc._id.toString(),
              owner: userById.bind(undefined, course._doc.owner)
            });

            _context5.next = 15;
            return _userModel2.default.findById(userId);

          case 15:
            owner = _context5.sent;

            if (owner) {
              _context5.next = 18;
              break;
            }

            throw new Error("User not found.");

          case 18:
            owner.createdCourses.push(course);

            _context5.next = 21;
            return owner.save();

          case 21:
            return _context5.abrupt("return", createdCourse);

          case 24:
            _context5.prev = 24;
            _context5.t0 = _context5["catch"](0);
            throw _context5.t0;

          case 27:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 24]]);
  }));

  return function courseCreate(_x9, _x10, _x11, _x12) {
    return _ref9.apply(this, arguments);
  };
}();

var getCourseLevels = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(_, args, ctx, info) {
    var query;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            // build query object
            query = {};

            query.owner = ctx.user;

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function getCourseLevels(_x13, _x14, _x15, _x16) {
    return _ref10.apply(this, arguments);
  };
}();

var getCreatedCourses = function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(_, args, ctx, info) {
    var token, user, query, cursorObj, cursor, courses, convertedCourses;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            console.log("ctx: ", ctx.req);
            _context7.prev = 1;

            if (ctx.isAuth) {
              _context7.next = 4;
              break;
            }

            return _context7.abrupt("return", new Error("You need to be registered to view this resource."));

          case 4:
            token = ctx.req.headers.authorization;
            _context7.next = 7;
            return (0, _resolverFunctions.userByToken)(token, function (err, res) {
              if (err) return err;
              return res;
            });

          case 7:
            user = _context7.sent;


            // build query object
            query = {};

            query.owner = user._id;
            // end query object

            console.log("cursor: ", args.cursor);

            if (args.cursor && args.cursor !== "done") {
              // type cast id, $lt is not the same in aggregate vs query
              cursorObj = _mongoose2.default.Types.ObjectId(args.cursor);
              // add to query object

              cursor = cursorObj;

              query._id = { $lt: cursor };
            }

            _context7.next = 14;
            return _courseModel2.default.find(query).limit(3).sort({ _id: -1 });

          case 14:
            courses = _context7.sent;
            convertedCourses = courses.map(function (course) {
              return (0, _extends3.default)({}, course._doc, {
                _id: course.id,
                owner: userById.bind(undefined, course._doc.owner)
              });
            });

            if (!(0, _isEmpty2.default)(convertedCourses)) {
              _context7.next = 20;
              break;
            }

            return _context7.abrupt("return", { courses: [], cursor: "done" });

          case 20:
            cursor = convertedCourses[convertedCourses.length - 1]._id;
            console.log("next cursor: ", cursor);
            return _context7.abrupt("return", { courses: convertedCourses, cursor: cursor });

          case 23:
            _context7.next = 28;
            break;

          case 25:
            _context7.prev = 25;
            _context7.t0 = _context7["catch"](1);
            throw _context7.t0;

          case 28:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[1, 25]]);
  }));

  return function getCreatedCourses(_x17, _x18, _x19, _x20) {
    return _ref11.apply(this, arguments);
  };
}();

var getCourses = function () {
  var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(_, args, ctx, info) {
    var courses, convertedCourses;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _courseModel2.default.find();

          case 3:
            courses = _context8.sent;
            convertedCourses = courses.map(function (course) {
              return (0, _extends3.default)({}, course._doc, {
                _id: course.id,
                owner: userById.bind(undefined, course._doc.owner)
              });
            });
            return _context8.abrupt("return", { courses: convertedCourses, cursor: "" });

          case 8:
            _context8.prev = 8;
            _context8.t0 = _context8["catch"](0);
            throw _context8.t0;

          case 11:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[0, 8]]);
  }));

  return function getCourses(_x21, _x22, _x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

var subscribe = function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(_, args, ctx, info) {
    var course, userId, user, result;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _courseModel2.default.findOneAndUpdate({ _id: args.courseId }, { $inc: { subscribers: 1 } });

          case 2:
            course = _context9.sent;
            userId = ctx.req.token._id;
            _context9.prev = 4;
            _context9.next = 7;
            return _userModel2.default.findById(userId, function (err, res) {
              if (err) return err;
              return res;
            });

          case 7:
            user = _context9.sent;

            user.subscriptions.push(course);

            _context9.next = 11;
            return user.save();

          case 11:
            result = _context9.sent;

            if (!result) {
              _context9.next = 14;
              break;
            }

            return _context9.abrupt("return", course);

          case 14:
            _context9.next = 19;
            break;

          case 16:
            _context9.prev = 16;
            _context9.t0 = _context9["catch"](4);
            throw _context9.t0;

          case 19:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[4, 16]]);
  }));

  return function subscribe(_x25, _x26, _x27, _x28) {
    return _ref13.apply(this, arguments);
  };
}();

var unsubscribe = function () {
  var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(_, args, ctx, info) {
    var course, userId, user, result;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _courseModel2.default.findOneAndUpdate({
              _id: args.courseId,
              subscribers: { $gte: 1 }
            }, { $inc: { subscribers: -1 } });

          case 2:
            course = _context10.sent;
            userId = ctx.req.token._id;
            _context10.prev = 4;
            _context10.next = 7;
            return _userModel2.default.findById(userId, function (err, res) {
              if (err) return err;
              return res;
            });

          case 7:
            user = _context10.sent;

            user.subscriptions.pull(course);

            _context10.next = 11;
            return user.save();

          case 11:
            result = _context10.sent;

            if (!result) {
              _context10.next = 14;
              break;
            }

            return _context10.abrupt("return", true);

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
    }, _callee10, undefined, [[4, 16]]);
  }));

  return function unsubscribe(_x29, _x30, _x31, _x32) {
    return _ref14.apply(this, arguments);
  };
}();

var courseResolvers = exports.courseResolvers = {
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
  } };
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(courseResolvers, "courseResolvers", "src/api/course/course-resolvers.js");
  reactHotLoader.register(escapeRegex, "escapeRegex", "src/api/course/course-resolvers.js");
  reactHotLoader.register(coursesById, "coursesById", "src/api/course/course-resolvers.js");
  reactHotLoader.register(mongooseToJs, "mongooseToJs", "src/api/course/course-resolvers.js");
  reactHotLoader.register(userById, "userById", "src/api/course/course-resolvers.js");
  reactHotLoader.register(getCourse, "getCourse", "src/api/course/course-resolvers.js");
  reactHotLoader.register(courseDelete, "courseDelete", "src/api/course/course-resolvers.js");
  reactHotLoader.register(courseUpdate, "courseUpdate", "src/api/course/course-resolvers.js");
  reactHotLoader.register(courseCreate, "courseCreate", "src/api/course/course-resolvers.js");
  reactHotLoader.register(getCourseLevels, "getCourseLevels", "src/api/course/course-resolvers.js");
  reactHotLoader.register(getCreatedCourses, "getCreatedCourses", "src/api/course/course-resolvers.js");
  reactHotLoader.register(getCourses, "getCourses", "src/api/course/course-resolvers.js");
  reactHotLoader.register(subscribe, "subscribe", "src/api/course/course-resolvers.js");
  reactHotLoader.register(unsubscribe, "unsubscribe", "src/api/course/course-resolvers.js");
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

  reactHotLoader.register(courseResolvers, "courseResolvers", "src/api/course/course-resolvers.js");
  reactHotLoader.register(escapeRegex, "escapeRegex", "src/api/course/course-resolvers.js");
  reactHotLoader.register(coursesById, "coursesById", "src/api/course/course-resolvers.js");
  reactHotLoader.register(mongooseToJs, "mongooseToJs", "src/api/course/course-resolvers.js");
  reactHotLoader.register(userById, "userById", "src/api/course/course-resolvers.js");
  reactHotLoader.register(getCourse, "getCourse", "src/api/course/course-resolvers.js");
  reactHotLoader.register(courseDelete, "courseDelete", "src/api/course/course-resolvers.js");
  reactHotLoader.register(courseUpdate, "courseUpdate", "src/api/course/course-resolvers.js");
  reactHotLoader.register(courseCreate, "courseCreate", "src/api/course/course-resolvers.js");
  reactHotLoader.register(getCourseLevels, "getCourseLevels", "src/api/course/course-resolvers.js");
  reactHotLoader.register(getCreatedCourses, "getCreatedCourses", "src/api/course/course-resolvers.js");
  reactHotLoader.register(getCourses, "getCourses", "src/api/course/course-resolvers.js");
  reactHotLoader.register(subscribe, "subscribe", "src/api/course/course-resolvers.js");
  reactHotLoader.register(unsubscribe, "unsubscribe", "src/api/course/course-resolvers.js");
  leaveModule(module);
})();

;