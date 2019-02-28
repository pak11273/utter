"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vocabularyResolvers = undefined;

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _config = require("../../config");

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _courseModel = require("../course/course-model");

var _courseModel2 = _interopRequireDefault(_courseModel);

var _levelModel = require("../level/level-model.js");

var _levelModel2 = _interopRequireDefault(_levelModel);

var _vocabularyModel = require("./vocabulary-model");

var _vocabularyModel2 = _interopRequireDefault(_vocabularyModel);

var _resolverFunctions = require("../shared/resolver-functions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var escapeRegex = function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

var getVocabulary = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_, _ref2, _ref3) {
    var levelId = _ref2.levelId;
    var user = _ref3.user;
    var vocabulary;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("levelId: ", levelId);
            _context.next = 3;
            return _vocabularyModel2.default.findById(levelId).exec();

          case 3:
            vocabulary = _context.sent;

            if (vocabulary) {
              _context.next = 6;
              break;
            }

            throw new Error("Cannot find vocabulary with id");

          case 6:
            return _context.abrupt("return", vocabulary);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getVocabulary(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var vocabularyDelete = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_, args, ctx) {
    var arrayOfErrors, token, user, vocabulary;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
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
            return _courseModel2.default.findOneAndUpdate({
              _id: args.courseId
            }, {
              $pull: {
                vocabulary: {
                  vocabulary: args.vocabulary
                }
              }
            }, { new: true });

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
    }, _callee2, undefined);
  }));

  return function vocabularyDelete(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var vocabularyUpdate = function vocabularyUpdate(_, _ref5) {
  var input = _ref5.input;
  var id = input.id,
      update = (0, _objectWithoutProperties3.default)(input, ["id"]);

  return _vocabularyModel2.default.findByIdAndUpdate(id, update, { new: true }).exec();
};

var vocabularyCreate = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_, args, ctx, info) {
    var arrayOfErrors, token, user, input, vocabulary, vocabularyArr, vocabularyObj;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log("args: ", args);
            arrayOfErrors = [];
            token = ctx.req.headers.authorization;

            if (!(token === "null")) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", new Error("You need to be registered to view this resource."));

          case 5:
            _context3.next = 7;
            return (0, _resolverFunctions.userByToken)(token, function (err, res) {
              if (err) return err;
              return res;
            });

          case 7:
            user = _context3.sent;
            input = args.input;
            _context3.next = 11;
            return _courseModel2.default.findOneAndUpdate({
              _id: input.courseId,
              "levels.level": {
                $eq: input.level
              }
            }, {
              $push: {
                "levels.$.vocabulary": {
                  audioUrl: input.audioUrl,
                  courseId: input.courseId,
                  gender: input.gender,
                  translation: input.translation,
                  word: input.word
                }
              }
            }, { new: true });

          case 11:
            vocabulary = _context3.sent;


            if (!vocabulary) {
              arrayOfErrors.push({
                path: "vocabulary",
                message: "Server Error: Could not save new vocabulary. Please contact technical support."
              });
            }

            vocabularyArr = vocabulary.levels[0].vocabulary;
            vocabularyObj = vocabularyArr[vocabularyArr.length - 1];

            vocabularyObj.toObject();
            vocabularyObj.id = vocabularyObj._id;
            console.log("vocabularyObj; ", vocabularyObj);
            return _context3.abrupt("return", {
              vocabulary: vocabularyObj,
              errors: arrayOfErrors
            });

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function vocabularyCreate(_x7, _x8, _x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

var getVocabularies = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_, args, ctx, info) {
    var result;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log("args: ", args);
            _context4.next = 3;
            return _courseModel2.default.find({ _id: args.courseId }).exec();

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
    }, _callee4, undefined);
  }));

  return function getVocabularies(_x11, _x12, _x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

var vocabularyResolvers = exports.vocabularyResolvers = {
  Query: {
    getVocabulary: getVocabulary,
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
  } };
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(vocabularyResolvers, "vocabularyResolvers", "src/api/vocabulary/vocabulary-resolvers.js");
  reactHotLoader.register(escapeRegex, "escapeRegex", "src/api/vocabulary/vocabulary-resolvers.js");
  reactHotLoader.register(getVocabulary, "getVocabulary", "src/api/vocabulary/vocabulary-resolvers.js");
  reactHotLoader.register(vocabularyDelete, "vocabularyDelete", "src/api/vocabulary/vocabulary-resolvers.js");
  reactHotLoader.register(vocabularyUpdate, "vocabularyUpdate", "src/api/vocabulary/vocabulary-resolvers.js");
  reactHotLoader.register(vocabularyCreate, "vocabularyCreate", "src/api/vocabulary/vocabulary-resolvers.js");
  reactHotLoader.register(getVocabularies, "getVocabularies", "src/api/vocabulary/vocabulary-resolvers.js");
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

  reactHotLoader.register(vocabularyResolvers, "vocabularyResolvers", "src/api/vocabulary/vocabulary-resolvers.js");
  reactHotLoader.register(escapeRegex, "escapeRegex", "src/api/vocabulary/vocabulary-resolvers.js");
  reactHotLoader.register(getVocabulary, "getVocabulary", "src/api/vocabulary/vocabulary-resolvers.js");
  reactHotLoader.register(vocabularyDelete, "vocabularyDelete", "src/api/vocabulary/vocabulary-resolvers.js");
  reactHotLoader.register(vocabularyUpdate, "vocabularyUpdate", "src/api/vocabulary/vocabulary-resolvers.js");
  reactHotLoader.register(vocabularyCreate, "vocabularyCreate", "src/api/vocabulary/vocabulary-resolvers.js");
  reactHotLoader.register(getVocabularies, "getVocabularies", "src/api/vocabulary/vocabulary-resolvers.js");
  leaveModule(module);
})();

;