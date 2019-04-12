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
    var levelId, user, vocabulary;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            levelId = _ref.levelId;
            user = _ref2.user;
            console.log("levelId: ", levelId);
            _context.next = 5;
            return _vocabularyModel.default.findById(levelId).exec();

          case 5:
            vocabulary = _context.sent;

            if (vocabulary) {
              _context.next = 8;
              break;
            }

            throw new Error("Cannot find vocabulary with id");

          case 8:
            return _context.abrupt("return", vocabulary);

          case 9:
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
    var arrayOfErrors, token, user, vocabulary;
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
            console.log("args: ", args);
            _context2.next = 10;
            return _courseModel.default.findOneAndUpdate({
              _id: args.levelId
            }, {
              $pull: {
                vocabulary: {
                  vocabulary: args.vocabulary
                }
              }
            }, {
              new: true
            });

          case 10:
            vocabulary = _context2.sent;
            console.log("LEVELVELVELVLELVELVELEL: ", vocabulary);

            if (!vocabulary) {
              arrayOfErrors.push({
                path: "vocabulary",
                message: "An Error has occured.  Please contact technical support."
              });
            }

            console.log("array of errors: ", arrayOfErrors);
            return _context2.abrupt("return", {
              vocabulary: args,
              errors: arrayOfErrors
            });

          case 15:
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

var vocabularyUpdate = function vocabularyUpdate(_, _ref5) {
  var input = _ref5.input;
  var id = input.id,
      update = (0, _objectWithoutProperties2.default)(input, ["id"]);
  return _vocabularyModel.default.findByIdAndUpdate(id, update, {
    new: true
  }).exec();
};

var vocabularyCreate =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(_, args, ctx, info) {
    var input, userId, user, newVocabulary, createdVocabulary, vocabulary, level;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log("args: ", args);
            input = args.input;
            _context3.prev = 2;

            if (ctx.isAuth) {
              _context3.next = 5;
              break;
            }

            throw new Error("You need to be registered to create a course.");

          case 5:
            userId = ctx.req.token._id;
            _context3.next = 8;
            return _userModel.default.findById(userId, function (err, res) {
              if (err) return err;
              return res;
            });

          case 8:
            user = _context3.sent;
            newVocabulary = new _vocabularyModel.default({
              audioUrl: input.audioUrl,
              levelId: input.levelId,
              gender: input.gender,
              translation: input.translation,
              word: input.word
            });
            _context3.next = 12;
            return newVocabulary.save();

          case 12:
            vocabulary = _context3.sent;
            console.log("vocab: ", vocabulary);
            _context3.next = 16;
            return _levelModel.default.findById(input.level);

          case 16:
            level = _context3.sent;

            if (level) {
              _context3.next = 19;
              break;
            }

            throw new Error("Level not found.");

          case 19:
            level.vocabulary.push(vocabulary);
            _context3.next = 22;
            return level.save();

          case 22:
            return _context3.abrupt("return", createdVocabulary);

          case 25:
            _context3.prev = 25;
            _context3.t0 = _context3["catch"](2);
            throw _context3.t0;

          case 28:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 25]]);
  }));

  return function vocabularyCreate(_x7, _x8, _x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

var getVocabularies =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(_, args, ctx, info) {
    var result;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log("args: ", args);
            _context4.next = 3;
            return _courseModel.default.find({
              _id: args.levelId
            }).exec();

          case 3:
            result = _context4.sent;
            console.log("result: ", result);
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

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getVocabularies(_x11, _x12, _x13, _x14) {
    return _ref7.apply(this, arguments);
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