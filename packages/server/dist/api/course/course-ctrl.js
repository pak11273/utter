"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _arguments = arguments;

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _faker2 = require("faker");

var _faker3 = _interopRequireDefault(_faker2);

var _cuid = require("cuid");

var _cuid2 = _interopRequireDefault(_cuid);

var _lodash = require("lodash");

var _courseModel = require("./course-model.js");

var _courseModel2 = _interopRequireDefault(_courseModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Types.ObjectId;

var _default = {
  get: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
      var limit, query, owner, prePopResult, result, totalRecords, _next, lastResultId;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              limit = parseInt(req.query.limit, 10);

              // query builder

              query = {};


              if (req.query.courseName) {
                query.courseName = new RegExp("" + req.query.courseName, "i");
              }
              if (req.query.courseRef) {
                query.courseRef = new RegExp("" + req.query.courseRef, "i");
              }
              if (req.query.owner) {
                query.owner = req.query.owner;
              }
              if (req.query.usingLang) {
                query.usingLang = req.query.usingLang;
              }
              if (req.query.teachingLang) {
                query.teachingLang = req.query.teachingLang;
              }

              _context.prev = 7;

              if (!req.query.owner) {
                _context.next = 12;
                break;
              }

              _context.next = 11;
              return _courseModel2.default.findByUsername(req.query.owner, function (err, docs) {
                if (err) {
                  // console.log doesn't work here
                }
                if (!(0, _lodash.isEmpty)(docs)) {
                  var owner = docs._id;
                  console.log("course author: ", owner);
                  query.owner = owner;
                }
              });

            case 11:
              owner = _context.sent;

            case 12:
              if (!(!req.query.next || req.query.next === "done")) {
                _context.next = 27;
                break;
              }

              _context.next = 15;
              return _courseModel2.default.aggregate([{ $match: query }, {
                $project: {
                  courseName: 1,
                  courseDescription: 1,
                  courseRef: 1,
                  owner: 1,
                  courseImage: 1,
                  subscribers: { $size: "$subscribers" }
                }
              }, { $sort: { _id: -1 } }, { $limit: limit }]);

            case 15:
              prePopResult = _context.sent;
              _context.next = 18;
              return _courseModel2.default.populate(prePopResult, {
                path: "owner"
              });

            case 18:
              result = _context.sent;
              _context.next = 21;
              return _courseModel2.default.find(query).countDocuments();

            case 21:
              totalRecords = _context.sent;

              console.log("rec: ", totalRecords);

              if (totalRecords <= limit) {
                next = "done";
              } else {
                next = result[result.length - 1]._id;
              }
              res.json({ result: result, next: next });
              _context.next = 40;
              break;

            case 27:
              // remaining queries
              console.log("remaining queries");
              _next = void 0;

              // type cast id, $lt is not the same in aggregate vs query

              _next = _mongoose2.default.Types.ObjectId(req.query.next);
              // add to query object

              query._id = { $lt: _next };

              _context.next = 33;
              return _courseModel2.default.aggregate([{ $match: query }, { $sort: { _id: -1 } }, { $limit: limit }, {
                $project: {
                  courseName: 1,
                  courseDescription: 1,
                  courseRef: 1,
                  owner: 1,
                  courseImage: 1,
                  subscribers: { $size: "$subscribers" }
                }
              }]);

            case 33:
              prePopResult = _context.sent;
              _context.next = 36;
              return _courseModel2.default.populate(prePopResult, {
                path: "owner"
              });

            case 36:
              result = _context.sent;
              lastResultId = "";


              if (!(0, _lodash.isEmpty)(lastResultId)) {
                lastResultId = result[result.length - 1]._id.toString();
              }

              if ((0, _lodash.isEmpty)(result)) {
                _next = "done";
                res.json({ result: result, next: _next });
              } else {
                _next = result[result.length - 1]._id;
                console.log("next: ", _next);
                res.json({ result: result, next: _next });
              }

            case 40:
              _context.next = 46;
              break;

            case 42:
              _context.prev = 42;
              _context.t0 = _context["catch"](7);

              console.log("err: ", _context.t0);
              next = "done";
              // res.json({result, next, err: error})

            case 46:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined, [[7, 42]]);
    }));

    return function get(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }(),

  getOne: function getOne(req, res, next) {
    if (req.params.courseId) {
      _courseModel2.default.findOne({
        _id: req.params.courseId,
        owner: req.params.owner
      }).then(function (data) {
        res.json({ data: data });
      }, function (err) {
        next(err);
      });
    }
  },

  findByParams: function findByParams(req, res, next, id) {
    _courseModel2.default.findById(id).then(function (course) {
      if (!course) {
        next(new Error("No course with that id"));
      } else {
        req.course = course;
        next();
      }
    }, function (err) {
      next(err);
    });
  },

  createOne: function createOne(req, res, next) {
    console.log("body: ", req.body.course);
    var newCourse = req.body.course;
    newCourse.owner = {
      _id: req.body.course.owner
    };
    _courseModel2.default.create(newCourse).then(function (course) {
      res.json(course);
    }, function (err) {
      next(err);
    });
  },

  unique: function unique(req, res, next) {
    _courseModel2.default.find({ courseName: req.body.course }).then(function (course) {
      if (!req.body.course) {
        res.status(400).json({ error: "This field is required." });
      } else if (course.length > 0) {
        // next(new Error('This course name is already taken.'))
        res.status(400).json({ error: "This course name is already taken." });
      } else {
        res.json({ msg: "This course name is available" });
      }
    }, function (err) {
      next(err);
    });
  },

  faker: function faker(req, res, next) {
    for (var i = 0; i < 3; ++i) {
      var course = new _courseModel2.default();

      console.log("course: ", course);
      // random object ids for terms.level
      var id1 = _mongoose2.default.Types.ObjectId();
      var id2 = _mongoose2.default.Types.ObjectId();
      var id3 = _mongoose2.default.Types.ObjectId();
      var id4 = _mongoose2.default.Types.ObjectId();
      course.category = _faker3.default.commerce.department();
      course.courseRef = _faker3.default.random.arrayElement(["TTMIK", "Topik Level 1", "How to study Korean"]);
      course.teachingLang = _faker3.default.random.arrayElement(["korean", "french", "spanish"]);
      course.usingLang = _faker3.default.random.arrayElement(["english", "french", "spanish"]);
      // TODO: change ids to ones in the db
      // course.subscribers = faker.random.arrayElement([
      //   ["5b6b21e445912f4b8277bb06"],
      //   ["5b6b21e445912f4b8277bb06", "5b9012f043aa4329f187f01a"],
      //   [
      //     "5b6b21e445912f4b8277bb06",
      //     "5b93f9184d034f51d0e72287",
      //     "5b9012f043aa4329f187f01a"
      //   ],
      //   ["5b9012f043aa4329f187f01a"],
      //   ["5b9012f043aa4329f187f01a", "5b93f9184d034f51d0e72287"],
      //   [
      //     "5b9012f043aa4329f187f01a",
      //     "5b6b21e445912f4b8277bb06",
      //     "5b93f9184d034f51d0e72287"
      //   ],
      //   ["5b93f9184d034f51d0e72287"],
      //   ["5b93f9184d034f51d0e72287", "5b6b21e445912f4b8277bb06"],
      //   [
      //     "5b93f9184d034f51d0e72287",
      //     "5b9012f043aa4329f187f01a",
      //     "5b93f9184d034f51d0e72287"
      //   ]
      // ])
      course.courseId = (0, _cuid2.default)();
      course.owner = _faker3.default.random.arrayElement(["5b9012f043aa4329f187f01a", "5b93f90c4d034f51d0e72286", "5baf12a86b73051f6295172b"]);
      course.courseName = _faker3.default.commerce.productName();
      course.price = _faker3.default.commerce.price();
      course.courseDescription = "Nothing but a chicken wing. I dont like chicken wings, I like buffalo spicy hot wings with a little bit of wine.  There is nothing wrong with the sauce in chicken wings, but its so mild.";
      course.courseImage = _faker3.default.image.image();
      course.levels = [{ id: "5c37691a3bcc4427fcd1a4ec" }];

      // console.log('course', course.levels[i]._id)
      course.save(function (err) {
        if (err) throw err;
      });
    }
    res.json(course);
  },

  putOne: function putOne(req, res, next) {
    console.log("hellodog");
    // if (req.params.courseId) {
    //   Course.findOne({courseId: req.params.courseId}).then(
    //     course => {
    //       res.json(course)
    //     },
    //     err => {
    //       next(err)
    //     }
    //   )
    // }
  },

  getTeachingCourses: function getTeachingCourses(req, res, next) {
    var pg = req.query.pg || 1;
    var limit = 1000;
    var offset = (pg - 1) * limit;
    // const pageStart = 1
    // const numPages = 10
    _courseModel2.default.paginate({ owner: req.params.owner }, { offset: offset, limit: limit, lean: true }).then(function (result) {
      res.json({
        result: result
      });
    }).catch(function (error) {
      console.error({
        message: "Error occured while paginating Course data",
        arguments: _arguments
      });
      throw error; // TODO: test return instead of throw
    });

    // More advanced example
    // var query = {};
    // var options = {
    //   select: 'title date author',
    //   sort: { date: -1 },
    //   populate: 'author',
    //   lean: true,
    //   offset: 20,
    //   limit: 10
    // };
  },

  updateOne: function updateOne(req, res, next) {
    var update = req.body;

    // update a level's name
    if (update.type === "LEVEL_ASYNC_UPDATE") {
      _courseModel2.default.findOneAndUpdate({ "levels._id": ObjectId(update.id) }, { $set: { name: update.name } }, function (err, data) {
        if (err) {
          next(err);
        } else {
          res.json({ data: data });
        }
      });
    } else {
      // update a course
      _courseModel2.default.findOneAndUpdate({ _id: update.courseId }, update, function (err, data) {
        if (err) {
          next(err);
        } else {
          res.json({ data: data });
        }
      });
    }
  },

  remove: function remove(req, res, next) {
    console.log("reg: ", req.params);
    var id = req.params.courseId;
    _courseModel2.default.findByIdAndRemove(id, function (err, deleted) {
      if (err) {
        next(err);
      } else {
        res.json(deleted);
      }
    });
  },

  deleteCourse: function deleteCourse(req, res, next) {
    console.log("reg: ", req.params);
    var id = req.params.courseId;
    _courseModel2.default.findByIdAndRemove(id, function (err, deleted) {
      if (err) {
        next(err);
      } else {
        res.json(deleted);
      }
    });
  },

  deleteLevel: function deleteLevel(req, res, next) {
    _courseModel2.default.findOne({ courseId: req.params.courseId }, function (err, course) {
      if (err) {
        console.log("err: ", err);
      }
      course.updateOne({ $pull: { levels: { _id: req.params.levelId } } }, function (err, deleted) {
        res.json(deleted);
      });
    }
    // {$pullAll: {id: [req.params.levelId]}}
    );
  }
};
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ObjectId, "ObjectId", "src/api/course/course-ctrl.js");
  reactHotLoader.register(_default, "default", "src/api/course/course-ctrl.js");
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

  reactHotLoader.register(ObjectId, "ObjectId", "src/api/course/course-ctrl.js");
  reactHotLoader.register(_default2, "default", "src/api/course/course-ctrl.js");
  leaveModule(module);
})();

;