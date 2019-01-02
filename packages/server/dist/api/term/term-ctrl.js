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

var _termModel = require("./term-model.js");

var _termModel2 = _interopRequireDefault(_termModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Types.ObjectId;

exports.default = (0, _defineProperty3.default)({
  get: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
      var limit, query, termAuthor, prePopResult, result, totalRecords, _next, lastResultId;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              limit = parseInt(req.query.limit, 10);

              // query builder

              query = {};


              if (req.query.termName) {
                query.termName = new RegExp("" + req.query.termName, "i");
              }
              if (req.query.termRef) {
                query.termRef = new RegExp("" + req.query.termRef, "i");
              }
              if (req.query.termAuthor) {
                query.termAuthor = req.query.termAuthor;
              }
              if (req.query.usingLang) {
                query.usingLang = req.query.usingLang;
              }
              if (req.query.teachingLang) {
                query.teachingLang = req.query.teachingLang;
              }

              _context.prev = 7;

              if (!req.query.termAuthor) {
                _context.next = 12;
                break;
              }

              _context.next = 11;
              return _termModel2.default.findByUsername(req.query.termAuthor, function (err, docs) {
                if (err) {
                  // console.log doesn't work here
                }
                if (!(0, _isEmpty2.default)(docs)) {
                  var termAuthor = docs._id;
                  console.log("term author: ", termAuthor);
                  query.termAuthor = termAuthor;
                }
              });

            case 11:
              termAuthor = _context.sent;

            case 12:
              if (!(!req.query.next || req.query.next === "done")) {
                _context.next = 27;
                break;
              }

              _context.next = 15;
              return _termModel2.default.aggregate([{ $match: query }, {
                $project: {
                  termName: 1,
                  termDescription: 1,
                  termRef: 1,
                  termAuthor: 1,
                  termImage: 1,
                  subscribers: { $size: "$subscribers" }
                }
              }, { $sort: { _id: -1 } }, { $limit: limit }]);

            case 15:
              prePopResult = _context.sent;
              _context.next = 18;
              return _termModel2.default.populate(prePopResult, {
                path: "termAuthor"
              });

            case 18:
              result = _context.sent;
              _context.next = 21;
              return _termModel2.default.find(query).countDocuments();

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
              return _termModel2.default.aggregate([{ $match: query }, { $sort: { _id: -1 } }, { $limit: limit }, {
                $project: {
                  termName: 1,
                  termDescription: 1,
                  termRef: 1,
                  termAuthor: 1,
                  termImage: 1,
                  subscribers: { $size: "$subscribers" }
                }
              }]);

            case 33:
              prePopResult = _context.sent;
              _context.next = 36;
              return _termModel2.default.populate(prePopResult, {
                path: "termAuthor"
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
    if (req.params.termId) {
      _termModel2.default.findOne({
        _id: req.params.termId,
        termAuthor: req.params.termAuthorId
      }).then(function (data) {
        res.json({ data: data });
      }, function (err) {
        next(err);
      });
    }
  },

  findByParams: function findByParams(req, res, next, id) {
    _termModel2.default.findById(id).then(function (term) {
      if (!term) {
        next(new Error("No term with that id"));
      } else {
        req.term = term;
        next();
      }
    }, function (err) {
      next(err);
    });
  },

  createOne: function createOne(req, res, next) {
    console.log("body: ", req.body.term);
    var newLevel = req.body.term;
    newLevel.termAuthor = {
      _id: req.body.term.termAuthorId
    };
    _termModel2.default.create(newLevel).then(function (term) {
      res.json(term);
    }, function (err) {
      next(err);
    });
  },

  unique: function unique(req, res, next) {
    _termModel2.default.find({ termName: req.body.term }).then(function (term) {
      if (!req.body.term) {
        res.status(400).json({ error: "This field is required." });
      } else if (term.length > 0) {
        // next(new Error('This term name is already taken.'))
        res.status(400).json({ error: "This term name is already taken." });
      } else {
        res.json({ msg: "This term name is available" });
      }
    }, function (err) {
      next(err);
    });
  },

  faker: function faker(req, res, next) {
    for (var i = 0; i < 3; ++i) {
      var _ref2, _ref3, _ref4, _ref5;

      var term = new _termModel2.default();

      console.log("term: ", term);
      // random object ids for terms.term
      var id1 = _mongoose2.default.Types.ObjectId();
      var id2 = _mongoose2.default.Types.ObjectId();
      var id3 = _mongoose2.default.Types.ObjectId();
      var id4 = _mongoose2.default.Types.ObjectId();
      term.category = _faker3.default.commerce.department();
      term.termRef = _faker3.default.random.arrayElement(["TTMIK", "Topik Level 1", "How to study Korean"]);
      term.teachingLang = _faker3.default.random.arrayElement(["korean", "french", "spanish"]);
      term.usingLang = _faker3.default.random.arrayElement(["english", "french", "spanish"]);
      // TODO: change ids to ones in the db
      // term.subscribers = faker.random.arrayElement([
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
      term.termId = (0, _cuid2.default)();
      term.termAuthor = _faker3.default.random.arrayElement(["5b9012f043aa4329f187f01a", "5b93f90c4d034f51d0e72286", "5baf12a86b73051f6295172b"]);
      term.termName = _faker3.default.commerce.productName();
      term.price = _faker3.default.commerce.price();
      term.termDescription = "Nothing but a chicken wing. I dont like chicken wings, I like buffalo spicy hot wings with a little bit of wine.  There is nothing wrong with the sauce in chicken wings, but its so mild.";
      term.termImage = _faker3.default.image.image();
      term.terms = [(_ref2 = {
        term: term._id
      }, (0, _defineProperty3.default)(_ref2, "term", 1), (0, _defineProperty3.default)(_ref2, "name", "Change Me"), (0, _defineProperty3.default)(_ref2, "terms", [{
        term: id1,
        word: "hello",
        translation: "안영"
      }, {
        term: id1,
        word: "world",
        translation: "세상"
      }]), _ref2), (_ref3 = {
        term: term._id
      }, (0, _defineProperty3.default)(_ref3, "term", 2), (0, _defineProperty3.default)(_ref3, "name", "Change Me"), (0, _defineProperty3.default)(_ref3, "terms", [{
        term: id2,
        word: "bart",
        translation: "안영"
      }, {
        term: id2,
        word: "sympson",
        translation: "세상"
      }]), _ref3), (_ref4 = {
        term: term._id
      }, (0, _defineProperty3.default)(_ref4, "term", 4), (0, _defineProperty3.default)(_ref4, "name", "Change Me"), (0, _defineProperty3.default)(_ref4, "terms", [{
        term: id3,
        word: "cat",
        translation: "안영"
      }, {
        term: id3,
        word: "dog",
        translation: "세상"
      }]), _ref4), (_ref5 = {
        term: term._id
      }, (0, _defineProperty3.default)(_ref5, "term", 10), (0, _defineProperty3.default)(_ref5, "name", "Change Me"), (0, _defineProperty3.default)(_ref5, "terms", [{
        term: id4,
        word: "merlin",
        translation: "안영"
      }, {
        term: id4,
        word: "samson",
        translation: "세상"
      }]), _ref5)];

      // console.log('term', term.terms[i]._id)
      term.save(function (err) {
        if (err) throw err;
      });
    }
    res.json(term);
  },

  putOne: function putOne(req, res, next) {
    console.log("hellodog");
    // if (req.params.termId) {
    //   Level.findOne({termId: req.params.termId}).then(
    //     term => {
    //       res.json(term)
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
    _termModel2.default.paginate({ termAuthorId: req.params.termAuthorId }, { offset: offset, limit: limit, lean: true }).then(function (result) {
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

    // update a term's name
    if (update.type === "LEVEL_ASYNC_UPDATE") {
      _termModel2.default.findOneAndUpdate({ "terms._id": ObjectId(update.id) }, { $set: { name: update.name } }, function (err, data) {
        if (err) {
          next(err);
        } else {
          res.json({ data: data });
        }
      });
    } else {
      // update a term
      _termModel2.default.findOneAndUpdate({ _id: update.termId }, update, function (err, data) {
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
    var id = req.params.termId;
    _termModel2.default.findByIdAndRemove(id, function (err, deleted) {
      if (err) {
        next(err);
      } else {
        res.json(deleted);
      }
    });
  },

  deleteLevel: function deleteLevel(req, res, next) {
    console.log("reg: ", req.params);
    var id = req.params.termId;
    _termModel2.default.findByIdAndRemove(id, function (err, deleted) {
      if (err) {
        next(err);
      } else {
        res.json(deleted);
      }
    });
  }

}, "deleteLevel", function deleteLevel(req, res, next) {
  _termModel2.default.findOne({ termId: req.params.termId }, function (err, term) {
    if (err) {
      console.log("err: ", err);
    }
    term.updateOne({ $pull: { terms: { _id: req.params.termId } } }, function (err, deleted) {
      res.json(deleted);
    });
  }
  // {$pullAll: {id: [req.params.termId]}}
  );
});