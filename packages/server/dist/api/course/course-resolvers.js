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

var _levelModel = _interopRequireDefault(require("../level/level-model.js"));

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
            _context2.prev = 0;
            _context2.next = 3;
            return _userModel.default.findById(userId).lean();

          case 3:
            user = _context2.sent;

            if (!user) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", (0, _objectSpread2.default)({}, user, {
              createdCourses: coursesById.bind(_this, user.createdCourses)
            }));

          case 6:
            return _context2.abrupt("return", {
              username: ""
            });

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
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
            console.log("args: ", args);
            _context3.next = 4;
            return _courseModel.default.findById(args._id).lean().exec();

          case 4:
            course = _context3.sent;

            if (course) {
              _context3.next = 7;
              break;
            }

            throw new Error("Cannot find course with id");

          case 7:
            return _context3.abrupt("return", course);

          case 8:
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
  _regenerator.default.mark(function _callee5(_, _ref5, ctx) {
    var resourceId, token, user, course, levels;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            resourceId = _ref5.resourceId;
            _context5.prev = 1;

            _userModel.default.find({
              "subscriptions._id": resourceId
            });

            token = ctx.req.headers.authorization;
            _context5.next = 6;
            return (0, _resolverFunctions.userByToken)(token, function (err, res) {
              if (err) return err;
              return res;
            });

          case 6:
            user = _context5.sent;
            _context5.next = 9;
            return _courseModel.default.findByIdAndDelete(resourceId.toString()).lean();

          case 9:
            course = _context5.sent;

            if (course) {
              _context5.next = 12;
              break;
            }

            throw new Error("No course found by this owner.");

          case 12:
            _context5.next = 14;
            return _levelModel.default.find({
              course: course._id
            }).lean();

          case 14:
            levels = _context5.sent;
            levels.map(
            /*#__PURE__*/
            function () {
              var _ref7 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee4(level) {
                var deleted;
                return _regenerator.default.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return _levelModel.default.findOneAndDelete({
                          _id: level._id
                        }).exec();

                      case 2:
                        deleted = _context4.sent;

                      case 3:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x9) {
                return _ref7.apply(this, arguments);
              };
            }());
            /* const level = await Level.deleteMany({course: course._id}).exec() */

            /* const vocabulary = await Vocabulary.deleteMany({course: course._id}).exec() */

            if (!course) {
              _context5.next = 20;
              break;
            }

            return _context5.abrupt("return", true);

          case 20:
            return _context5.abrupt("return", false);

          case 21:
            _context5.next = 26;
            break;

          case 23:
            _context5.prev = 23;
            _context5.t0 = _context5["catch"](1);
            throw _context5.t0;

          case 26:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 23]]);
  }));

  return function courseDelete(_x6, _x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();

var courseUpdate =
/*#__PURE__*/
function () {
  var _ref8 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee6(_, args, ctx) {
    var _args$input, _id, update, course, updatedCourse;

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

            return _context6.abrupt("return", new Error("You need to be registered to edit this course."));

          case 4:
            _args$input = args.input, _id = _args$input._id, update = (0, _objectWithoutProperties2.default)(_args$input, ["_id"]);
            _context6.next = 7;
            return _courseModel.default.findByIdAndUpdate(_id, update, {
              new: true
            }).lean();

          case 7:
            course = _context6.sent;
            updatedCourse = (0, _objectSpread2.default)({}, course, {
              _id: course._id.toString(),
              owner: userById.bind(_this, course.owner)
            });
            return _context6.abrupt("return", updatedCourse);

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](1);
            throw _context6.t0;

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 12]]);
  }));

  return function courseUpdate(_x10, _x11, _x12) {
    return _ref8.apply(this, arguments);
  };
}();

var courseCreate =
/*#__PURE__*/
function () {
  var _ref9 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee7(_, args, ctx, info) {
    var userId, user, newCourse, createdCourse, course, owner;
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            console.log("args: ", args);
            _context7.prev = 1;

            if (ctx.isAuth) {
              _context7.next = 4;
              break;
            }

            throw new Error("You need to be registered to create a course.");

          case 4:
            userId = ctx.req.token._id;
            _context7.next = 7;
            return _userModel.default.findById(userId, function (err, res) {
              if (err) return err;
              return res;
            });

          case 7:
            user = _context7.sent;
            newCourse = new _courseModel.default({
              courseImage: args.input.courseImage,
              title: args.input.title,
              courseDescription: args.input.courseDescription,
              courseMode: args.input.courseMode,
              resource: args.input.resource,
              teachingLang: args.input.teachingLang,
              usingLang: args.input.usingLang,
              owner: user._id
            });
            _context7.next = 11;
            return newCourse.save();

          case 11:
            course = _context7.sent;
            createdCourse = (0, _objectSpread2.default)({}, course._doc, {
              _id: course._doc._id.toString(),
              owner: userById.bind(_this, course._doc.owner)
            });
            _context7.next = 15;
            return _userModel.default.findById(userId);

          case 15:
            owner = _context7.sent;

            if (owner) {
              _context7.next = 18;
              break;
            }

            throw new Error("User not found.");

          case 18:
            owner.createdCourses.push(course);
            _context7.next = 21;
            return owner.save();

          case 21:
            return _context7.abrupt("return", createdCourse);

          case 24:
            _context7.prev = 24;
            _context7.t0 = _context7["catch"](1);
            throw _context7.t0;

          case 27:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 24]]);
  }));

  return function courseCreate(_x13, _x14, _x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();

var getCourseLevels =
/*#__PURE__*/
function () {
  var _ref10 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee8(_, args, ctx, info) {
    var query;
    return _regenerator.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            // build query object
            query = {};
            query.owner = ctx.user;

          case 2:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getCourseLevels(_x17, _x18, _x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

var getCreatedCourses =
/*#__PURE__*/
function () {
  var _ref11 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee9(_, args, ctx, info) {
    var token, user, query, cursorObj, cursor, courses, convertedCourses, lastCourse;
    return _regenerator.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;

            if (ctx.isAuth) {
              _context9.next = 3;
              break;
            }

            return _context9.abrupt("return", new Error("You need to be registered to create a course."));

          case 3:
            token = ctx.req.headers.authorization;
            _context9.next = 6;
            return (0, _resolverFunctions.userByToken)(token, function (err, res) {
              if (err) return err;
              return res;
            });

          case 6:
            user = _context9.sent;
            // build query object
            query = {};
            query.owner = user._id; // end query object

            if (args.cursor && args.cursor !== "done") {
              // type cast id because $lt is not the same in aggregate vs query
              cursorObj = _mongoose.default.Types.ObjectId(args.cursor); // add to query object

              cursor = cursorObj;
              query._id = {
                $lt: cursor
              };
            }

            _context9.next = 12;
            return _courseModel.default.find(query).lean()
            /* .limit(3) */
            .sort({
              _id: -1
            });

          case 12:
            courses = _context9.sent;

            if (!(0, _isEmpty.default)(courses)) {
              _context9.next = 15;
              break;
            }

            return _context9.abrupt("return", {
              courses: [],
              cursor: "done"
            });

          case 15:
            convertedCourses = courses.map(function (course) {
              return (0, _objectSpread2.default)({}, course, {
                owner: userById.bind(_this, course.owner)
              });
            });
            _context9.next = 18;
            return _courseModel.default.findOne().sort({
              field: "asc",
              _id: 1
            });

          case 18:
            lastCourse = _context9.sent;
            //TODO: index?
            cursor = convertedCourses[convertedCourses.length - 1]._id;

            if (!((0, _isEmpty.default)(convertedCourses) || lastCourse._doc._id.toString() === cursor)) {
              _context9.next = 24;
              break;
            }

            return _context9.abrupt("return", {
              courses: convertedCourses,
              cursor: "done"
            });

          case 24:
            return _context9.abrupt("return", {
              courses: convertedCourses,
              cursor: cursor
            });

          case 25:
            _context9.next = 30;
            break;

          case 27:
            _context9.prev = 27;
            _context9.t0 = _context9["catch"](0);
            throw _context9.t0;

          case 30:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 27]]);
  }));

  return function getCreatedCourses(_x21, _x22, _x23, _x24) {
    return _ref11.apply(this, arguments);
  };
}();

var getCourses =
/*#__PURE__*/
function () {
  var _ref12 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee10(_, args, ctx, info) {
    var more, input, query, key, courses, lastCourses, lastCourse, obj;
    return _regenerator.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            more = false;
            input = args.input;

            if (input.searchInput || input.selectionBox) {
              input[input.selectionBox] = input.searchInput;
              delete input.searchInput;
              delete input.selectionBox;
            }

            query = {};

            for (key in input) {
              input[key] !== "" ? query[key] = input[key] : null;
            }

            query.title ? query.title = new RegExp(escapeRegex(query.title), "gi") : null;

            if (!query.owner) {
              _context10.next = 10;
              break;
            }

            _context10.next = 9;
            return _userModel.default.findOne({
              username: query.owner
            }, function (err, docs) {
              if (err) {
                throw err;
              }

              if (!(0, _isEmpty.default)(docs)) {
                var owner = docs._id;
                query.owner = docs._id;
              }
            });

          case 9:
            query.owner = _context10.sent;

          case 10:
            query.resource ? query.resource = new RegExp(escapeRegex(query.resource), "gi") : null;

            if (query.cursor) {
              query._id = {
                $lt: query.cursor || null
              };
              delete query.cursor;
            }

            _context10.prev = 12;
            _context10.next = 15;
            return _courseModel.default.find(query).populate("owner").sort({
              _id: -1
            }).limit(4).lean();

          case 15:
            courses = _context10.sent;
            _context10.next = 18;
            return _courseModel.default.find(query).sort({
              _id: -1
            }).lean();

          case 18:
            lastCourses = _context10.sent;

            if (lastCourses.length !== 0) {
              lastCourse = lastCourses[lastCourses.length - 1]._id;
            } else {
              lastCourse = {};
            }

            obj = courses.find(function (o) {
              return o._id.toString() === lastCourse._id.toString();
            });

            if (obj) {
              more = false;
            } else {
              more = true;
            }

            return _context10.abrupt("return", {
              courses: courses,
              more: more
            });

          case 25:
            _context10.prev = 25;
            _context10.t0 = _context10["catch"](12);
            throw _context10.t0;

          case 28:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[12, 25]]);
  }));

  return function getCourses(_x25, _x26, _x27, _x28) {
    return _ref12.apply(this, arguments);
  };
}();

var subscribe =
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
              _id: args.courseId
            }, {
              $inc: {
                subscribers: 1
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
            user.subscriptions.push(course);
            _context11.next = 11;
            return user.save();

          case 11:
            result = _context11.sent;

            if (!result) {
              _context11.next = 14;
              break;
            }

            return _context11.abrupt("return", course);

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

  return function subscribe(_x29, _x30, _x31, _x32) {
    return _ref13.apply(this, arguments);
  };
}();

var unsubscribe =
/*#__PURE__*/
function () {
  var _ref14 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee12(_, args, ctx, info) {
    var course, userId, user, result;
    return _regenerator.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
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
            course = _context12.sent;
            userId = ctx.req.token._id;
            _context12.prev = 4;
            _context12.next = 7;
            return _userModel.default.findById(userId, function (err, res) {
              if (err) return err;
              return res;
            });

          case 7:
            user = _context12.sent;
            user.subscriptions.pull(course);
            _context12.next = 11;
            return user.save();

          case 11:
            result = _context12.sent;

            if (!result) {
              _context12.next = 14;
              break;
            }

            return _context12.abrupt("return", true);

          case 14:
            _context12.next = 19;
            break;

          case 16:
            _context12.prev = 16;
            _context12.t0 = _context12["catch"](4);
            throw _context12.t0;

          case 19:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[4, 16]]);
  }));

  return function unsubscribe(_x33, _x34, _x35, _x36) {
    return _ref14.apply(this, arguments);
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