"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vocabularyResolvers = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _config = _interopRequireDefault(require("../../config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _courseModel = _interopRequireDefault(require("../course/course-model"));

var _levelModel = _interopRequireDefault(require("../level/level-model.js"));

var _userModel = _interopRequireDefault(require("../user/user-model.js"));

var _vocabularyModel = _interopRequireDefault(require("./vocabulary-model"));

var _resolverFunctions = require("../shared/resolver-functions.js");

var escapeRegex = function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

var getVocabulary =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_, _ref, _ref2) {
    var level, user, vocabulary;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            level = _ref.level;
            user = _ref2.user;
            _context.next = 4;
            return _vocabularyModel.default.findById(level).exec();

          case 4:
            vocabulary = _context.sent;

            if (vocabulary) {
              _context.next = 7;
              break;
            }

            throw new Error("Cannot find vocabulary with id");

          case 7:
            return _context.abrupt("return", vocabulary);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getVocabulary(_x, _x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

var vocabularyDelete =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(_, args, ctx) {
    var arrayOfErrors, token, user, word, level;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            arrayOfErrors = [];

            if (!(token === "null")) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", new Error("You need to be registered to view this resource."));

          case 3:
            token = ctx.req.headers.authorization;
            _context2.next = 6;
            return (0, _resolverFunctions.userByToken)(token, function (err, res) {
              if (err) return err;
              return res;
            });

          case 6:
            user = _context2.sent;
            _context2.next = 9;
            return _vocabularyModel.default.findOneAndDelete({
              _id: args._id
            }).lean();

          case 9:
            word = _context2.sent;
            _context2.next = 12;
            return _levelModel.default.findById(word.level);

          case 12:
            level = _context2.sent;
            level.vocabulary.pull(word._id);
            level.save();

            if (!word) {
              arrayOfErrors.push({
                path: "word",
                message: "An Error has occured.  Please contact technical support."
              });
            }

            return _context2.abrupt("return", {
              word: word,
              errors: arrayOfErrors
            });

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function vocabularyDelete(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var vocabularyUpdate =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(_, _ref5) {
    var input, arrayOfErrors, _id, update, updatedWord;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            input = _ref5.input;
            _context3.prev = 1;
            arrayOfErrors = [];
            _id = input._id, update = (0, _objectWithoutProperties2.default)(input, ["_id"]);
            _context3.next = 6;
            return _vocabularyModel.default.findByIdAndUpdate(_id, update, {
              new: true
            }).exec();

          case 6:
            updatedWord = _context3.sent;
            return _context3.abrupt("return", {
              vocabulary: updatedWord,
              errors: arrayOfErrors
            });

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", {
              vocabulary: null,
              errors: [{
                message: _context3.t0
              }]
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 10]]);
  }));

  return function vocabularyUpdate(_x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();

var vocabularyCreate =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(_, args, ctx, info) {
    var arrayOfErrors, input, userId, user, newVocabulary, vocabulary, level;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            arrayOfErrors = [];
            input = args.input;
            _context4.prev = 2;

            if (ctx.isAuth) {
              _context4.next = 5;
              break;
            }

            throw new Error("You need to be registered to create a course.");

          case 5:
            userId = ctx.req.token._id;
            _context4.next = 8;
            return _userModel.default.findById(userId, function (err, res) {
              if (err) return err;
              return res;
            });

          case 8:
            user = _context4.sent;
            newVocabulary = new _vocabularyModel.default({
              audioUrl: input.audioUrl,
              level: input.level,
              gender: input.gender,
              translation: input.translation,
              word: input.word
            });
            _context4.next = 12;
            return newVocabulary.save();

          case 12:
            vocabulary = _context4.sent;
            _context4.next = 15;
            return _levelModel.default.findById(input.level);

          case 15:
            level = _context4.sent;
            level.vocabulary.push(vocabulary);
            level.save();

            if (level) {
              _context4.next = 20;
              break;
            }

            throw new Error("Level not found.");

          case 20:
            return _context4.abrupt("return", {
              vocabulary: vocabulary,
              errors: arrayOfErrors
            });

          case 23:
            _context4.prev = 23;
            _context4.t0 = _context4["catch"](2);
            throw _context4.t0;

          case 26:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 23]]);
  }));

  return function vocabularyCreate(_x9, _x10, _x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();

var getVocabularies =
/*#__PURE__*/
function () {
  var _ref8 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(_, args, ctx, info) {
    var arrayOfErrors, result;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            arrayOfErrors = [];
            _context5.next = 3;
            return _levelModel.default.findById(args.level).populate("vocabulary").lean();

          case 3:
            result = _context5.sent;
            return _context5.abrupt("return", {
              vocabulary: result.vocabulary,
              errors: arrayOfErrors
              /* if (!result || isEmpty(result)) { */

              /*   return {vocabulary: []} */

              /* } */

              /* const sortedVocabulary = result[0].vocabulary.sort((a, b) => { */

              /*   return a.vocabulary - b.vocabulary */

              /* }) */

              /* if (isEmpty(result)) { */

              /*   return {vocabulary: []} */

              /* } else { */

              /*   return {vocabulary: sortedVocabulary} */

              /* } */

            });

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getVocabularies(_x13, _x14, _x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

var vocabularyResolvers = {
  Query: {
    getVocabularies: getVocabularies
  },
  Mutation: {
    vocabularyDelete: vocabularyDelete,
    vocabularyUpdate: vocabularyUpdate,
    vocabularyCreate: vocabularyCreate
    /* Vocabulary: { */

    /*   async course(vocabulary) { */

    /*     const populated = await vocabulary.populate("course").execPopulate() */

    /*     return populated.course */

    /*   } */

    /* } */

  }
};
exports.vocabularyResolvers = vocabularyResolvers;