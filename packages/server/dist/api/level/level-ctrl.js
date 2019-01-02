"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _arguments = arguments;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _faker2 = require("faker");

var _faker3 = _interopRequireDefault(_faker2);

var _cuid = require("cuid");

var _cuid2 = _interopRequireDefault(_cuid);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _levelModel = require("./level-model.js");

var _levelModel2 = _interopRequireDefault(_levelModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Types.ObjectId;

exports.default = (0, _defineProperty3.default)({
  get: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
      var limit, query, levelAuthor, prePopResult, result, totalRecords, _next, lastResultId;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              limit = parseInt(req.query.limit, 10);

              // query builder

              query = {};


              if (req.query.levelName) {
                query.levelName = new RegExp("" + req.query.levelName, "i");
              }
              if (req.query.levelRef) {
                query.levelRef = new RegExp("" + req.query.levelRef, "i");
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
              return _levelModel2.default.findByUsername(req.query.levelAuthor, function (err, docs) {
                if (err) {
                  // console.log doesn't work here
                }
                if (!(0, _isEmpty2.default)(docs)) {
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
              return _levelModel2.default.aggregate([{ $match: query }, {
                $project: {
                  levelName: 1,
                  levelDescription: 1,
                  levelRef: 1,
                  levelAuthor: 1,
                  levelImage: 1,
                  subscribers: { $size: "$subscribers" }
                }
              }, { $sort: { _id: -1 } }, { $limit: limit }]);

            case 15:
              prePopResult = _context.sent;
              _context.next = 18;
              return _levelModel2.default.populate(prePopResult, {
                path: "levelAuthor"
              });

            case 18:
              result = _context.sent;
              _context.next = 21;
              return _levelModel2.default.find(query).countDocuments();

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
              return _levelModel2.default.aggregate([{ $match: query }, { $sort: { _id: -1 } }, { $limit: limit }, {
                $project: {
                  levelName: 1,
                  levelDescription: 1,
                  levelRef: 1,
                  levelAuthor: 1,
                  levelImage: 1,
                  subscribers: { $size: "$subscribers" }
                }
              }]);

            case 33:
              prePopResult = _context.sent;
              _context.next = 36;
              return _levelModel2.default.populate(prePopResult, {
                path: "levelAuthor"
              });

            case 36:
              result = _context.sent;
              lastResultId = "";


              if (!(0, _isEmpty2.default)(lastResultId)) {
                lastResultId = result[result.length - 1]._id.toString();
              }

              if ((0, _isEmpty2.default)(result)) {
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
    if (req.params.levelId) {
      _levelModel2.default.findOne({
        _id: req.params.levelId,
        levelAuthor: req.params.levelAuthorId
      }).then(function (data) {
        res.json({ data: data });
      }, function (err) {
        next(err);
      });
    }
  },

  findByParams: function findByParams(req, res, next, id) {
    _levelModel2.default.findById(id).then(function (level) {
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
    _levelModel2.default.create(newLevel).then(function (level) {
      res.json(level);
    }, function (err) {
      next(err);
    });
  },

  unique: function unique(req, res, next) {
    _levelModel2.default.find({ levelName: req.body.level }).then(function (level) {
      if (!req.body.level) {
        res.status(400).json({ error: "This field is required." });
      } else if (level.length > 0) {
        // next(new Error('This level name is already taken.'))
        res.status(400).json({ error: "This level name is already taken." });
      } else {
        res.json({ msg: "This level name is available" });
      }
    }, function (err) {
      next(err);
    });
  },

  faker: function faker(req, res, next) {
    for (var i = 0; i < 3; ++i) {
      var _ref2, _ref3, _ref4, _ref5;

      var level = new _levelModel2.default();

      console.log("level: ", level);
      // random object ids for terms.level
      var id1 = _mongoose2.default.Types.ObjectId();
      var id2 = _mongoose2.default.Types.ObjectId();
      var id3 = _mongoose2.default.Types.ObjectId();
      var id4 = _mongoose2.default.Types.ObjectId();
      level.category = _faker3.default.commerce.department();
      level.levelRef = _faker3.default.random.arrayElement(["TTMIK", "Topik Level 1", "How to study Korean"]);
      level.teachingLang = _faker3.default.random.arrayElement(["korean", "french", "spanish"]);
      level.usingLang = _faker3.default.random.arrayElement(["english", "french", "spanish"]);
      // TODO: change ids to ones in the db
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
      level.levelId = (0, _cuid2.default)();
      level.levelAuthor = _faker3.default.random.arrayElement(["5b9012f043aa4329f187f01a", "5b93f90c4d034f51d0e72286", "5baf12a86b73051f6295172b"]);
      level.levelName = _faker3.default.commerce.productName();
      level.price = _faker3.default.commerce.price();
      level.levelDescription = "Nothing but a chicken wing. I dont like chicken wings, I like buffalo spicy hot wings with a little bit of wine.  There is nothing wrong with the sauce in chicken wings, but its so mild.";
      level.levelImage = _faker3.default.image.image();
      level.levels = [(_ref2 = {
        level: level._id
      }, (0, _defineProperty3.default)(_ref2, "level", 1), (0, _defineProperty3.default)(_ref2, "name", "Change Me"), (0, _defineProperty3.default)(_ref2, "terms", [{
        level: id1,
        word: "hello",
        translation: "안영"
      }, {
        level: id1,
        word: "world",
        translation: "세상"
      }]), _ref2), (_ref3 = {
        level: level._id
      }, (0, _defineProperty3.default)(_ref3, "level", 2), (0, _defineProperty3.default)(_ref3, "name", "Change Me"), (0, _defineProperty3.default)(_ref3, "terms", [{
        level: id2,
        word: "bart",
        translation: "안영"
      }, {
        level: id2,
        word: "sympson",
        translation: "세상"
      }]), _ref3), (_ref4 = {
        level: level._id
      }, (0, _defineProperty3.default)(_ref4, "level", 4), (0, _defineProperty3.default)(_ref4, "name", "Change Me"), (0, _defineProperty3.default)(_ref4, "terms", [{
        level: id3,
        word: "cat",
        translation: "안영"
      }, {
        level: id3,
        word: "dog",
        translation: "세상"
      }]), _ref4), (_ref5 = {
        level: level._id
      }, (0, _defineProperty3.default)(_ref5, "level", 10), (0, _defineProperty3.default)(_ref5, "name", "Change Me"), (0, _defineProperty3.default)(_ref5, "terms", [{
        level: id4,
        word: "merlin",
        translation: "안영"
      }, {
        level: id4,
        word: "samson",
        translation: "세상"
      }]), _ref5)];

      // console.log('level', level.levels[i]._id)
      level.save(function (err) {
        if (err) throw err;
      });
    }
    res.json(level);
  },

  putOne: function putOne(req, res, next) {
    console.log("hellodog");
    // if (req.params.levelId) {
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
    var offset = (pg - 1) * limit;
    // const pageStart = 1
    // const numPages = 10
    _levelModel2.default.paginate({ levelAuthorId: req.params.levelAuthorId }, { offset: offset, limit: limit, lean: true }).then(function (result) {
      res.json({
        result: result
      });
    }).catch(function (error) {
      console.error({
        message: "Error occured while paginating Level data",
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
      _levelModel2.default.findOneAndUpdate({ "levels._id": ObjectId(update.id) }, { $set: { name: update.name } }, function (err, data) {
        if (err) {
          next(err);
        } else {
          res.json({ data: data });
        }
      });
    } else {
      // update a level
      _levelModel2.default.findOneAndUpdate({ _id: update.levelId }, update, function (err, data) {
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
    var id = req.params.levelId;
    _levelModel2.default.findByIdAndRemove(id, function (err, deleted) {
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
    _levelModel2.default.findByIdAndRemove(id, function (err, deleted) {
      if (err) {
        next(err);
      } else {
        res.json(deleted);
      }
    });
  }

}, "deleteLevel", function deleteLevel(req, res, next) {
  _levelModel2.default.findOne({ levelId: req.params.levelId }, function (err, level) {
    if (err) {
      console.log("err: ", err);
    }
    level.updateOne({ $pull: { levels: { _id: req.params.levelId } } }, function (err, deleted) {
      res.json(deleted);
    });
  }
  // {$pullAll: {id: [req.params.levelId]}}
  );
});