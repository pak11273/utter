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

var _cuid = _interopRequireDefault(require("cuid"));

var _lodash = require("lodash");

var _termModel = _interopRequireDefault(require("./term-model.js"));

var _arguments = arguments;
var ObjectId = _mongoose.default.Types.ObjectId;

var _default = (0, _defineProperty2.default)({
  get: function () {
    var _get = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(req, res, next) {
      var limit, query, termAuthor, prePopResult, result, totalRecords, _next, lastResultId;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              limit = parseInt(req.query.limit, 10);
              query = {};

              if (req.query.termName) {
                query.termName = new RegExp("".concat(req.query.termName), "i");
              }

              if (req.query.termRef) {
                query.termRef = new RegExp("".concat(req.query.termRef), "i");
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
              return _termModel.default.findByUsername(req.query.termAuthor, function (err, docs) {
                if (err) {}

                if (!(0, _lodash.isEmpty)(docs)) {
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
              return _termModel.default.aggregate([{
                $match: query
              }, {
                $project: {
                  termName: 1,
                  termDescription: 1,
                  termRef: 1,
                  termAuthor: 1,
                  termImage: 1,
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
              return _termModel.default.populate(prePopResult, {
                path: "termAuthor"
              });

            case 18:
              result = _context.sent;
              _context.next = 21;
              return _termModel.default.find(query).countDocuments();

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
              console.log("remaining queries");
              _next = _mongoose.default.Types.ObjectId(req.query.next);
              query._id = {
                $lt: _next
              };
              _context.next = 32;
              return _termModel.default.aggregate([{
                $match: query
              }, {
                $sort: {
                  _id: -1
                }
              }, {
                $limit: limit
              }, {
                $project: {
                  termName: 1,
                  termDescription: 1,
                  termRef: 1,
                  termAuthor: 1,
                  termImage: 1,
                  subscribers: {
                    $size: "$subscribers"
                  }
                }
              }]);

            case 32:
              prePopResult = _context.sent;
              _context.next = 35;
              return _termModel.default.populate(prePopResult, {
                path: "termAuthor"
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
              next = "done";

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
    if (req.params.termId) {
      _termModel.default.findOne({
        _id: req.params.termId,
        termAuthor: req.params.termAuthorId
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
    _termModel.default.findById(id).then(function (term) {
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

    _termModel.default.create(newLevel).then(function (term) {
      res.json(term);
    }, function (err) {
      next(err);
    });
  },
  unique: function unique(req, res, next) {
    _termModel.default.find({
      termName: req.body.term
    }).then(function (term) {
      if (!req.body.term) {
        res.status(400).json({
          error: "This field is required."
        });
      } else if (term.length > 0) {
        res.status(400).json({
          error: "This term name is already taken."
        });
      } else {
        res.json({
          msg: "This term name is available"
        });
      }
    }, function (err) {
      next(err);
    });
  },
  faker: function faker(req, res, next) {
    for (var i = 0; i < 3; ++i) {
      var _ref, _ref2, _ref3, _ref4;

      var term = new _termModel.default();
      console.log("term: ", term);

      var id1 = _mongoose.default.Types.ObjectId();

      var id2 = _mongoose.default.Types.ObjectId();

      var id3 = _mongoose.default.Types.ObjectId();

      var id4 = _mongoose.default.Types.ObjectId();

      term.category = _faker2.default.commerce.department();
      term.termRef = _faker2.default.random.arrayElement(["TTMIK", "Topik Level 1", "How to study Korean"]);
      term.teachingLang = _faker2.default.random.arrayElement(["korean", "french", "spanish"]);
      term.usingLang = _faker2.default.random.arrayElement(["english", "french", "spanish"]);
      term.termId = (0, _cuid.default)();
      term.termAuthor = _faker2.default.random.arrayElement(["5b9012f043aa4329f187f01a", "5b93f90c4d034f51d0e72286", "5baf12a86b73051f6295172b"]);
      term.termName = _faker2.default.commerce.productName();
      term.price = _faker2.default.commerce.price();
      term.termDescription = "Nothing but a chicken wing. I dont like chicken wings, I like buffalo spicy hot wings with a little bit of wine.  There is nothing wrong with the sauce in chicken wings, but its so mild.";
      term.termImage = _faker2.default.image.image();
      term.terms = [(_ref = {
        term: term._id
      }, (0, _defineProperty2.default)(_ref, "term", 1), (0, _defineProperty2.default)(_ref, "name", "Change Me"), (0, _defineProperty2.default)(_ref, "terms", [{
        term: id1,
        word: "hello",
        translation: "안영"
      }, {
        term: id1,
        word: "world",
        translation: "세상"
      }]), _ref), (_ref2 = {
        term: term._id
      }, (0, _defineProperty2.default)(_ref2, "term", 2), (0, _defineProperty2.default)(_ref2, "name", "Change Me"), (0, _defineProperty2.default)(_ref2, "terms", [{
        term: id2,
        word: "bart",
        translation: "안영"
      }, {
        term: id2,
        word: "sympson",
        translation: "세상"
      }]), _ref2), (_ref3 = {
        term: term._id
      }, (0, _defineProperty2.default)(_ref3, "term", 4), (0, _defineProperty2.default)(_ref3, "name", "Change Me"), (0, _defineProperty2.default)(_ref3, "terms", [{
        term: id3,
        word: "cat",
        translation: "안영"
      }, {
        term: id3,
        word: "dog",
        translation: "세상"
      }]), _ref3), (_ref4 = {
        term: term._id
      }, (0, _defineProperty2.default)(_ref4, "term", 10), (0, _defineProperty2.default)(_ref4, "name", "Change Me"), (0, _defineProperty2.default)(_ref4, "terms", [{
        term: id4,
        word: "merlin",
        translation: "안영"
      }, {
        term: id4,
        word: "samson",
        translation: "세상"
      }]), _ref4)];
      term.save(function (err) {
        if (err) throw err;
      });
    }

    res.json(term);
  },
  putOne: function putOne(req, res, next) {
    console.log("hellodog");
  },
  getTeachingLevels: function getTeachingLevels(req, res, next) {
    var pg = req.query.pg || 1;
    var limit = 1000;
    var offset = (pg - 1) * limit;

    _termModel.default.paginate({
      termAuthorId: req.params.termAuthorId
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
      throw error;
    });
  },
  updateOne: function updateOne(req, res, next) {
    var update = req.body;

    if (update.type === "LEVEL_ASYNC_UPDATE") {
      _termModel.default.findOneAndUpdate({
        "terms._id": ObjectId(update.id)
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
      _termModel.default.findOneAndUpdate({
        _id: update.termId
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
    var id = req.params.termId;

    _termModel.default.findByIdAndRemove(id, function (err, deleted) {
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

    _termModel.default.findByIdAndRemove(id, function (err, deleted) {
      if (err) {
        next(err);
      } else {
        res.json(deleted);
      }
    });
  }
}, "deleteLevel", function deleteLevel(req, res, next) {
  _termModel.default.findOne({
    termId: req.params.termId
  }, function (err, term) {
    if (err) {
      console.log("err: ", err);
    }

    term.updateOne({
      $pull: {
        terms: {
          _id: req.params.termId
        }
      }
    }, function (err, deleted) {
      res.json(deleted);
    });
  });
});

exports.default = _default;