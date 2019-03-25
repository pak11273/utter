"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _faker2 = _interopRequireDefault(require("faker"));

var _lodash = require("lodash");

var _vocabularyModel = _interopRequireDefault(require("./vocabulary-model.js"));

var _arguments = arguments;
var ObjectId = _mongoose.default.Types.ObjectId;

var _default = (0, _defineProperty2.default)({
  get: function () {
    var _get = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(req, res, next) {
      var limit, query, vocabularyAuthor, prePopResult, result, totalRecords, _next, lastResultId;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              limit = parseInt(req.query.limit, 10); // query builder

              query = {};

              if (req.query.vocabularyName) {
                query.vocabularyName = new RegExp("".concat(req.query.vocabularyName), "i");
              }

              if (req.query.vocabularyRef) {
                query.vocabularyRef = new RegExp("".concat(req.query.vocabularyRef), "i");
              }

              if (req.query.vocabularyAuthor) {
                query.vocabularyAuthor = req.query.vocabularyAuthor;
              }

              if (req.query.usingLang) {
                query.usingLang = req.query.usingLang;
              }

              if (req.query.teachingLang) {
                query.teachingLang = req.query.teachingLang;
              }

              _context.prev = 7;

              if (!req.query.vocabularyAuthor) {
                _context.next = 12;
                break;
              }

              _context.next = 11;
              return _vocabularyModel.default.findByUsername(req.query.vocabularyAuthor, function (err, docs) {
                if (err) {}

                if (!(0, _lodash.isEmpty)(docs)) {
                  var vocabularyAuthor = docs._id;
                  console.log("vocabulary author: ", vocabularyAuthor);
                  query.vocabularyAuthor = vocabularyAuthor;
                }
              });

            case 11:
              vocabularyAuthor = _context.sent;

            case 12:
              if (!(!req.query.next || req.query.next === "done")) {
                _context.next = 27;
                break;
              }

              _context.next = 15;
              return _vocabularyModel.default.aggregate([{
                $match: query
              }, {
                $project: {
                  vocabularyName: 1,
                  vocabularyDescription: 1,
                  vocabularyRef: 1,
                  vocabularyAuthor: 1,
                  vocabularyImage: 1,
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
              return _vocabularyModel.default.populate(prePopResult, {
                path: "vocabularyAuthor"
              });

            case 18:
              result = _context.sent;
              _context.next = 21;
              return _vocabularyModel.default.find(query).countDocuments();

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
              return _vocabularyModel.default.aggregate([{
                $match: query
              }, {
                $sort: {
                  _id: -1
                }
              }, {
                $limit: limit
              }, {
                $project: {
                  vocabularyName: 1,
                  vocabularyDescription: 1,
                  vocabularyRef: 1,
                  vocabularyAuthor: 1,
                  vocabularyImage: 1,
                  subscribers: {
                    $size: "$subscribers"
                  }
                }
              }]);

            case 32:
              prePopResult = _context.sent;
              _context.next = 35;
              return _vocabularyModel.default.populate(prePopResult, {
                path: "vocabularyAuthor"
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
    if (req.params.vocabularyId) {
      _vocabularyModel.default.findOne({
        _id: req.params.vocabularyId,
        vocabularyAuthor: req.params.vocabularyAuthorId
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
    _vocabularyModel.default.findById(id).then(function (vocabulary) {
      if (!vocabulary) {
        next(new Error("No vocabulary with that id"));
      } else {
        req.vocabulary = vocabulary;
        next();
      }
    }, function (err) {
      next(err);
    });
  },
  createOne: function createOne(req, res, next) {
    console.log("body: ", req.body.vocabulary);
    var newVocabulary = req.body.vocabulary;
    newVocabulary.vocabularyAuthor = {
      _id: req.body.vocabulary.vocabularyAuthorId
    };

    _vocabularyModel.default.create(newVocabulary).then(function (vocabulary) {
      res.json(vocabulary);
    }, function (err) {
      next(err);
    });
  },
  unique: function unique(req, res, next) {
    _vocabularyModel.default.find({
      vocabularyName: req.body.vocabulary
    }).then(function (vocabulary) {
      if (!req.body.vocabulary) {
        res.status(400).json({
          error: "This field is required."
        });
      } else if (vocabulary.length > 0) {
        // next(new Error('This vocabulary name is already taken.'))
        res.status(400).json({
          error: "This vocabulary name is already taken."
        });
      } else {
        res.json({
          msg: "This vocabulary name is available"
        });
      }
    }, function (err) {
      next(err);
    });
  },
  faker: function faker(req, res, next) {
    for (var i = 0; i < 3; ++i) {
      var vocabulary = new _vocabularyModel.default();
      console.log("vocabulary: ", vocabulary); // random object ids for <pending>

      var id1 = _mongoose.default.Types.ObjectId();

      var id2 = _mongoose.default.Types.ObjectId();

      var id3 = _mongoose.default.Types.ObjectId();

      vocabulary.category = _faker2.default.commerce.department();
      vocabulary.vocabulary = _faker2.default.random.number();
      vocabulary.title = _faker2.default.random.arrayElement(["alphabet", "body parts", "bedroom"]);
      vocabulary.Course = _faker2.default.random.arrayElement(["5b6b21e445912f4b8277bb06", "5b6b21e445912f4b8277bb06", "5b6b21e445912f4b8277bb06"]); // TODO: change ids to ones in the db
      // vocabulary.subscribers = faker.random.arrayElement([
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

      vocabulary.vocabularyDescription = "Nothing but a chicken wing. I dont like chicken wings, I like buffalo spicy hot wings with a little bit of wine.  There is nothing wrong with the sauce in chicken wings, but its so mild.";
      vocabulary.save(function (err) {
        if (err) throw err;
      });
    }

    res.json(vocabulary);
  },
  putOne: function putOne(req, res, next) {
    console.log("hellodog"); // if (req.params.vocabularyId) {
    //   Vocabulary.findOne({vocabularyId: req.params.vocabularyId}).then(
    //     vocabulary => {
    //       res.json(vocabulary)
    //     },
    //     err => {
    //       next(err)
    //     }
    //   )
    // }
  },
  getTeachingVocabulary: function getTeachingVocabulary(req, res, next) {
    var pg = req.query.pg || 1;
    var limit = 1000;
    var offset = (pg - 1) * limit; // const pageStart = 1
    // const numPages = 10

    _vocabularyModel.default.paginate({
      vocabularyAuthorId: req.params.vocabularyAuthorId
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
        message: "Error occured while paginating Vocabulary data",
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
    var update = req.body; // update a vocabulary's name

    if (update.type === "LEVEL_ASYNC_UPDATE") {
      _vocabularyModel.default.findOneAndUpdate({
        "vocabulary._id": ObjectId(update.id)
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
      // update a vocabulary
      _vocabularyModel.default.findOneAndUpdate({
        _id: update.vocabularyId
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
    var id = req.params.vocabularyId;

    _vocabularyModel.default.findByIdAndRemove(id, function (err, deleted) {
      if (err) {
        next(err);
      } else {
        res.json(deleted);
      }
    });
  },
  deleteVocabulary: function deleteVocabulary(req, res, next) {
    console.log("reg: ", req.params);
    var id = req.params.vocabularyId;

    _vocabularyModel.default.findByIdAndRemove(id, function (err, deleted) {
      if (err) {
        next(err);
      } else {
        res.json(deleted);
      }
    });
  }
}, "deleteVocabulary", function deleteVocabulary(req, res, next) {
  _vocabularyModel.default.findOne({
    vocabularyId: req.params.vocabularyId
  }, function (err, vocabulary) {
    if (err) {
      console.log("err: ", err);
    }

    vocabulary.updateOne({
      $pull: {
        vocabulary: {
          _id: req.params.vocabularyId
        }
      }
    }, function (err, deleted) {
      res.json(deleted);
    });
  } // {$pullAll: {id: [req.params.vocabularyId]}}
  );
});

exports.default = _default;