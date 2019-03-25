"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _faker2 = _interopRequireDefault(require("faker"));

var _lodash = require("lodash");

var _levelModel = _interopRequireDefault(require("./level-model.js"));

var _arguments = arguments;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ObjectId = _mongoose.default.Types.ObjectId;

var _default = _defineProperty({
  get: function () {
    var _get = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      var limit, query, levelAuthor, prePopResult, result, totalRecords, _next2, lastResultId;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              limit = parseInt(req.query.limit, 10); // query builder

              query = {};

              if (req.query.levelName) {
                query.levelName = new RegExp("".concat(req.query.levelName), "i");
              }

              if (req.query.levelRef) {
                query.levelRef = new RegExp("".concat(req.query.levelRef), "i");
              }

              if (req.query.levelAuthor) {
                query.levelAuthor = req.query.levelAuthor;
              }

              if (req.query.usingLang) {
                query.usingLang = req.query.usingLang;
              }

              if (req.query.teachingLang) {
                query.teachingLang = req.query.teachingLang;
              }

              _context.prev = 7;

              if (!req.query.levelAuthor) {
                _context.next = 12;
                break;
              }

              _context.next = 11;
              return _levelModel.default.findByUsername(req.query.levelAuthor, function (err, docs) {
                if (err) {}

                if (!(0, _lodash.isEmpty)(docs)) {
                  var levelAuthor = docs._id;
                  console.log("level author: ", levelAuthor);
                  query.levelAuthor = levelAuthor;
                }
              });

            case 11:
              levelAuthor = _context.sent;

            case 12:
              if (!(!req.query.next || req.query.next === "done")) {
                _context.next = 27;
                break;
              }

              _context.next = 15;
              return _levelModel.default.aggregate([{
                $match: query
              }, {
                $project: {
                  levelName: 1,
                  levelDescription: 1,
                  levelRef: 1,
                  levelAuthor: 1,
                  levelImage: 1,
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
              return _levelModel.default.populate(prePopResult, {
                path: "levelAuthor"
              });

            case 18:
              result = _context.sent;
              _context.next = 21;
              return _levelModel.default.find(query).countDocuments();

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
              _next2 = _mongoose.default.Types.ObjectId(req.query.next); // add to query object

              query._id = {
                $lt: _next2
              };
              _context.next = 32;
              return _levelModel.default.aggregate([{
                $match: query
              }, {
                $sort: {
                  _id: -1
                }
              }, {
                $limit: limit
              }, {
                $project: {
                  levelName: 1,
                  levelDescription: 1,
                  levelRef: 1,
                  levelAuthor: 1,
                  levelImage: 1,
                  subscribers: {
                    $size: "$subscribers"
                  }
                }
              }]);

            case 32:
              prePopResult = _context.sent;
              _context.next = 35;
              return _levelModel.default.populate(prePopResult, {
                path: "levelAuthor"
              });

            case 35:
              result = _context.sent;
              lastResultId = "";

              if (!(0, _lodash.isEmpty)(lastResultId)) {
                lastResultId = result[result.length - 1]._id.toString();
              }

              if ((0, _lodash.isEmpty)(result)) {
                _next2 = "done";
                res.json({
                  result: result,
                  next: _next2
                });
              } else {
                _next2 = result[result.length - 1]._id;
                console.log("next: ", _next2);
                res.json({
                  result: result,
                  next: _next2
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
    if (req.params.levelId) {
      _levelModel.default.findOne({
        _id: req.params.levelId,
        levelAuthor: req.params.levelAuthorId
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
    _levelModel.default.findById(id).then(function (level) {
      if (!level) {
        next(new Error("No level with that id"));
      } else {
        req.level = level;
        next();
      }
    }, function (err) {
      next(err);
    });
  },
  createOne: function createOne(req, res, next) {
    console.log("body: ", req.body.level);
    var newLevel = req.body.level;
    newLevel.levelAuthor = {
      _id: req.body.level.levelAuthorId
    };

    _levelModel.default.create(newLevel).then(function (level) {
      res.json(level);
    }, function (err) {
      next(err);
    });
  },
  unique: function unique(req, res, next) {
    _levelModel.default.find({
      levelName: req.body.level
    }).then(function (level) {
      if (!req.body.level) {
        res.status(400).json({
          error: "This field is required."
        });
      } else if (level.length > 0) {
        // next(new Error('This level name is already taken.'))
        res.status(400).json({
          error: "This level name is already taken."
        });
      } else {
        res.json({
          msg: "This level name is available"
        });
      }
    }, function (err) {
      next(err);
    });
  },
  faker: function faker(req, res, next) {
    for (var i = 0; i < 3; ++i) {
      var level = new _levelModel.default();
      console.log("level: ", level); // random object ids for <pending>

      var id1 = _mongoose.default.Types.ObjectId();

      var id2 = _mongoose.default.Types.ObjectId();

      var id3 = _mongoose.default.Types.ObjectId();

      level.category = _faker2.default.commerce.department();
      level.level = _faker2.default.random.number();
      level.title = _faker2.default.random.arrayElement(["alphabet", "body parts", "bedroom"]);
      level.Course = _faker2.default.random.arrayElement(["5b6b21e445912f4b8277bb06", "5b6b21e445912f4b8277bb06", "5b6b21e445912f4b8277bb06"]); // TODO: change ids to ones in the db
      // level.subscribers = faker.random.arrayElement([
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

      level.levelDescription = "Nothing but a chicken wing. I dont like chicken wings, I like buffalo spicy hot wings with a little bit of wine.  There is nothing wrong with the sauce in chicken wings, but its so mild.";
      level.save(function (err) {
        if (err) throw err;
      });
    }

    res.json(level);
  },
  putOne: function putOne(req, res, next) {
    console.log("hellodog"); // if (req.params.levelId) {
    //   Level.findOne({levelId: req.params.levelId}).then(
    //     level => {
    //       res.json(level)
    //     },
    //     err => {
    //       next(err)
    //     }
    //   )
    // }
  },
  getTeachingLevels: function getTeachingLevels(req, res, next) {
    var pg = req.query.pg || 1;
    var limit = 1000;
    var offset = (pg - 1) * limit; // const pageStart = 1
    // const numPages = 10

    _levelModel.default.paginate({
      levelAuthorId: req.params.levelAuthorId
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
        message: "Error occured while paginating Level data",
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
      _levelModel.default.findOneAndUpdate({
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
      // update a level
      _levelModel.default.findOneAndUpdate({
        _id: update.levelId
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
    var id = req.params.levelId;

    _levelModel.default.findByIdAndRemove(id, function (err, deleted) {
      if (err) {
        next(err);
      } else {
        res.json(deleted);
      }
    });
  },
  deleteLevel: function deleteLevel(req, res, next) {
    console.log("reg: ", req.params);
    var id = req.params.levelId;

    _levelModel.default.findByIdAndRemove(id, function (err, deleted) {
      if (err) {
        next(err);
      } else {
        res.json(deleted);
      }
    });
  }
}, "deleteLevel", function deleteLevel(req, res, next) {
  _levelModel.default.findOne({
    levelId: req.params.levelId
  }, function (err, level) {
    if (err) {
      console.log("err: ", err);
    }

    level.updateOne({
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
});

exports.default = _default;