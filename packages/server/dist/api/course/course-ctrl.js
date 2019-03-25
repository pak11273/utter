"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _faker2 = _interopRequireDefault(require("faker"));

var _cuid = _interopRequireDefault(require("cuid"));

var _lodash = require("lodash");

var _courseModel = _interopRequireDefault(require("./course-model.js"));

var _arguments = arguments;
var ObjectId = _mongoose.default.Types.ObjectId;
var _default = {
  get: function () {
    var _get = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(req, res, next) {
      var limit, query, owner, prePopResult, result, totalRecords, _next, lastResultId;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              limit = parseInt(req.query.limit, 10); // query builder

              query = {};

              if (req.query.courseName) {
                query.courseName = new RegExp("".concat(req.query.courseName), "i");
              }

              if (req.query.resources) {
                query.resources = new RegExp("".concat(req.query.resources), "i");
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
              return _courseModel.default.findByUsername(req.query.owner, function (err, docs) {
                if (err) {}

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
              return _courseModel.default.aggregate([{
                $match: query
              }, {
                $project: {
                  courseName: 1,
                  courseDescription: 1,
                  resources: 1,
                  owner: 1,
                  courseImage: 1,
                  subscribers: {
                    $size: "$subscribers"
                  }
                }
              }, {
                $sort: {
                  _id: -1
                }
              }, {
                $limit: limit
              }]);

            case 15:
              prePopResult = _context.sent;
              _context.next = 18;
              return _courseModel.default.populate(prePopResult, {
                path: "owner"
              });

            case 18:
              result = _context.sent;
              _context.next = 21;
              return _courseModel.default.find(query).countDocuments();

            case 21:
              totalRecords = _context.sent;
              console.log("rec: ", totalRecords);

              if (totalRecords <= limit) {
                next = "done";
              } else {
                next = result[result.length - 1]._id;
              }

              res.json({
                result: result,
                next: next
              });
              _context.next = 39;
              break;

            case 27:
              // remaining queries
              console.log("remaining queries");
              // type cast id, $lt is not the same in aggregate vs query
              _next = _mongoose.default.Types.ObjectId(req.query.next); // add to query object

              query._id = {
                $lt: _next
              };
              _context.next = 32;
              return _courseModel.default.aggregate([{
                $match: query
              }, {
                $sort: {
                  _id: -1
                }
              }, {
                $limit: limit
              }, {
                $project: {
                  courseName: 1,
                  courseDescription: 1,
                  resources: 1,
                  owner: 1,
                  courseImage: 1,
                  subscribers: {
                    $size: "$subscribers"
                  }
                }
              }]);

            case 32:
              prePopResult = _context.sent;
              _context.next = 35;
              return _courseModel.default.populate(prePopResult, {
                path: "owner"
              });

            case 35:
              result = _context.sent;
              lastResultId = "";

              if (!(0, _lodash.isEmpty)(lastResultId)) {
                lastResultId = result[result.length - 1]._id.toString();
              }

              if ((0, _lodash.isEmpty)(result)) {
                _next = "done";
                res.json({
                  result: result,
                  next: _next
                });
              } else {
                _next = result[result.length - 1]._id;
                console.log("next: ", _next);
                res.json({
                  result: result,
                  next: _next
                });
              }

            case 39:
              _context.next = 45;
              break;

            case 41:
              _context.prev = 41;
              _context.t0 = _context["catch"](7);
              console.log("err: ", _context.t0);
              next = "done"; // res.json({result, next, err: error})

            case 45:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[7, 41]]);
    }));

    function get(_x, _x2, _x3) {
      return _get.apply(this, arguments);
    }

    return get;
  }(),
  getOne: function getOne(req, res, next) {
    if (req.params.courseId) {
      _courseModel.default.findOne({
        _id: req.params.courseId,
        owner: req.params.owner
      }).then(function (data) {
        res.json({
          data: data
        });
      }, function (err) {
        next(err);
      });
    }
  },
  findByParams: function findByParams(req, res, next, id) {
    _courseModel.default.findById(id).then(function (course) {
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

    _courseModel.default.create(newCourse).then(function (course) {
      res.json(course);
    }, function (err) {
      next(err);
    });
  },
  unique: function unique(req, res, next) {
    _courseModel.default.find({
      courseName: req.body.course
    }).then(function (course) {
      if (!req.body.course) {
        res.status(400).json({
          error: "This field is required."
        });
      } else if (course.length > 0) {
        // next(new Error('This course name is already taken.'))
        res.status(400).json({
          error: "This course name is already taken."
        });
      } else {
        res.json({
          msg: "This course name is available"
        });
      }
    }, function (err) {
      next(err);
    });
  },
  faker: function faker(req, res, next) {
    for (var i = 0; i < 3; ++i) {
      var course = new _courseModel.default();
      console.log("course: ", course); // random object ids for terms.level

      var id1 = _mongoose.default.Types.ObjectId();

      var id2 = _mongoose.default.Types.ObjectId();

      var id3 = _mongoose.default.Types.ObjectId();

      var id4 = _mongoose.default.Types.ObjectId();

      course.category = _faker2.default.commerce.department();
      course.resources = _faker2.default.random.arrayElement(["TTMIK", "Topik Level 1", "How to study Korean"]);
      course.teachingLang = _faker2.default.random.arrayElement(["korean", "french", "spanish"]);
      course.usingLang = _faker2.default.random.arrayElement(["english", "french", "spanish"]); // TODO: change ids to ones in the db
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

      course.courseId = (0, _cuid.default)();
      course.owner = _faker2.default.random.arrayElement(["5b9012f043aa4329f187f01a", "5b93f90c4d034f51d0e72286", "5baf12a86b73051f6295172b"]);
      course.courseName = _faker2.default.commerce.productName();
      course.price = _faker2.default.commerce.price();
      course.courseDescription = "Nothing but a chicken wing. I dont like chicken wings, I like buffalo spicy hot wings with a little bit of wine.  There is nothing wrong with the sauce in chicken wings, but its so mild.";
      course.courseImage = _faker2.default.image.image();
      course.levels = [{
        id: "5c37691a3bcc4427fcd1a4ec"
      }]; // console.log('course', course.levels[i]._id)

      course.save(function (err) {
        if (err) throw err;
      });
    }

    res.json(course);
  },
  putOne: function putOne(req, res, next) {
    console.log("hellodog"); // if (req.params.courseId) {
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
    var offset = (pg - 1) * limit; // const pageStart = 1
    // const numPages = 10

    _courseModel.default.paginate({
      owner: req.params.owner
    }, {
      offset: offset,
      limit: limit,
      lean: true
    }).then(function (result) {
      res.json({
        result: result
      });
    }).catch(function (error) {
      console.error({
        message: "Error occured while paginating Course data",
        arguments: _arguments
      });
      throw error; // TODO: test return instead of throw
    }); // More advanced example
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
    var update = req.body; // update a level's name

    if (update.type === "LEVEL_ASYNC_UPDATE") {
      _courseModel.default.findOneAndUpdate({
        "levels._id": ObjectId(update.id)
      }, {
        $set: {
          name: update.name
        }
      }, function (err, data) {
        if (err) {
          next(err);
        } else {
          res.json({
            data: data
          });
        }
      });
    } else {
      // update a course
      _courseModel.default.findOneAndUpdate({
        _id: update.courseId
      }, update, function (err, data) {
        if (err) {
          next(err);
        } else {
          res.json({
            data: data
          });
        }
      });
    }
  },
  remove: function remove(req, res, next) {
    console.log("reg: ", req.params);
    var id = req.params.courseId;

    _courseModel.default.findByIdAndRemove(id, function (err, deleted) {
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

    _courseModel.default.findByIdAndRemove(id, function (err, deleted) {
      if (err) {
        next(err);
      } else {
        res.json(deleted);
      }
    });
  },
  deleteLevel: function deleteLevel(req, res, next) {
    _courseModel.default.findOne({
      courseId: req.params.courseId
    }, function (err, course) {
      if (err) {
        console.log("err: ", err);
      }

      course.updateOne({
        $pull: {
          levels: {
            _id: req.params.levelId
          }
        }
      }, function (err, deleted) {
        res.json(deleted);
      });
    } // {$pullAll: {id: [req.params.levelId]}}
    );
  }
};
exports.default = _default;