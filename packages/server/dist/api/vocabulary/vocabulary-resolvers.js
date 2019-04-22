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

var cloudinary = require("cloudinary").v2;

var escapeRegex = function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

var folder = "vocabulary-audio";

var vocabularyAudioSave =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_, args, ctx, info) {
    var arrayOfErrors, vocabulary;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("args: ", args);
            arrayOfErrors = [];
            _context.prev = 2;
            _context.next = 5;
            return _vocabularyModel.default.findByIdAndUpdate(args._id, args, {
              new: true
            }).lean();

          case 5:
            vocabulary = _context.sent;
            console.log("vocabulary: ", vocabulary);
            return _context.abrupt("return", {
              vocabulary: vocabulary,
              errors: arrayOfErrors
            });

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", {
              vocabulary: null,
              errors: arrayOfErrors
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 10]]);
  }));

  return function vocabularyAudioSave(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var vocabularyAudioDelete =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(_, args, ctx, info) {
    var arrayOfErrors;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log("args: ", args);
            arrayOfErrors = [];
            _context3.prev = 2;
            // delete from cdn
            cloudinary.uploader.destroy(folder + "/" + args.public_id, {
              invalidate: true,
              resource_type: "video"
            },
            /*#__PURE__*/
            function () {
              var _ref3 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee2(err, result) {
                var vocabulary;
                return _regenerator.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (!err) {
                          _context2.next = 2;
                          break;
                        }

                        throw err;

                      case 2:
                        _context2.next = 4;
                        return _vocabularyModel.default.findByIdAndUpdate(args._id, {
                          audioUrl: null
                        }, {
                          new: true
                        }).exec();

                      case 4:
                        vocabulary = _context2.sent;
                        console.log("vocabulary: ", vocabulary);
                        return _context2.abrupt("return", {
                          vocabulary: vocabulary,
                          errors: arrayOfErrors
                        });

                      case 7:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x9, _x10) {
                return _ref3.apply(this, arguments);
              };
            }());
            _context3.next = 10;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](2);
            arrayOfErrors.push({
              path: "audio",
              message: _context3.t0
            });
            return _context3.abrupt("return", {
              vocabulary: null,
              errors: arrayOfErrors
            });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 6]]);
  }));

  return function vocabularyAudioDelete(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var vocabularyCreate =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
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

  return function vocabularyCreate(_x11, _x12, _x13, _x14) {
    return _ref4.apply(this, arguments);
  };
}();

var getVocabulary =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(_, _ref5, _ref6) {
    var level, user, vocabulary;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            level = _ref5.level;
            user = _ref6.user;
            _context5.next = 4;
            return _vocabularyModel.default.findById(level).exec();

          case 4:
            vocabulary = _context5.sent;

            if (vocabulary) {
              _context5.next = 7;
              break;
            }

            throw new Error("Cannot find vocabulary with id");

          case 7:
            return _context5.abrupt("return", vocabulary);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getVocabulary(_x15, _x16, _x17) {
    return _ref7.apply(this, arguments);
  };
}();

var vocabularyDelete =
/*#__PURE__*/
function () {
  var _ref8 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee7(_, args, ctx) {
    var arrayOfErrors, token, user, word, level;
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            console.log("args; ", args);
            arrayOfErrors = [];

            if (!(token === "null")) {
              _context7.next = 4;
              break;
            }

            return _context7.abrupt("return", new Error("You need to be registered to view this resource."));

          case 4:
            token = ctx.req.headers.authorization;
            _context7.next = 7;
            return (0, _resolverFunctions.userByToken)(token, function (err, res) {
              if (err) return err;
              return res;
            });

          case 7:
            user = _context7.sent;
            _context7.next = 10;
            return _vocabularyModel.default.findOneAndDelete({
              _id: args._id
            }).lean();

          case 10:
            word = _context7.sent;
            _context7.next = 13;
            return _levelModel.default.findById(word.level);

          case 13:
            level = _context7.sent;
            level.vocabulary.pull(word._id);
            level.save(); // delete from cdn

            _context7.next = 18;
            return cloudinary.uploader.destroy(folder + "/" + args.public_id, {
              invalidate: true,
              resource_type: "video"
            },
            /*#__PURE__*/
            function () {
              var _ref9 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee6(err, result) {
                return _regenerator.default.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        if (!err) {
                          _context6.next = 2;
                          break;
                        }

                        throw err;

                      case 2:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function (_x21, _x22) {
                return _ref9.apply(this, arguments);
              };
            }());

          case 18:
            if (!word) {
              arrayOfErrors.push({
                path: "word",
                message: "An Error has occured.  Please contact technical support."
              });
            }

            return _context7.abrupt("return", {
              word: word,
              errors: arrayOfErrors
            });

          case 20:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function vocabularyDelete(_x18, _x19, _x20) {
    return _ref8.apply(this, arguments);
  };
}();

var vocabularyUpdate =
/*#__PURE__*/
function () {
  var _ref11 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee8(_, _ref10) {
    var input, arrayOfErrors, _id, update, updatedWord;

    return _regenerator.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            input = _ref10.input;
            _context8.prev = 1;
            arrayOfErrors = [];
            _id = input._id, update = (0, _objectWithoutProperties2.default)(input, ["_id"]);
            _context8.next = 6;
            return _vocabularyModel.default.findByIdAndUpdate(_id, update, {
              new: true
            }).exec();

          case 6:
            updatedWord = _context8.sent;
            return _context8.abrupt("return", {
              vocabulary: updatedWord,
              errors: arrayOfErrors
            });

          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](1);
            return _context8.abrupt("return", {
              vocabulary: null,
              errors: [{
                message: _context8.t0
              }]
            });

          case 13:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 10]]);
  }));

  return function vocabularyUpdate(_x23, _x24) {
    return _ref11.apply(this, arguments);
  };
}();

var getVocabularies =
/*#__PURE__*/
function () {
  var _ref12 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee9(_, args, ctx, info) {
    var arrayOfErrors, result;
    return _regenerator.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            arrayOfErrors = [];
            _context9.next = 3;
            return _levelModel.default.findById(args.level).populate("vocabulary").lean();

          case 3:
            result = _context9.sent;
            return _context9.abrupt("return", {
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
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function getVocabularies(_x25, _x26, _x27, _x28) {
    return _ref12.apply(this, arguments);
  };
}();

var vocabularyResolvers = {
  Query: {
    getVocabularies: getVocabularies
  },
  Mutation: {
    vocabularyAudioSave: vocabularyAudioSave,
    vocabularyAudioDelete: vocabularyAudioDelete,
    vocabularyCreate: vocabularyCreate,
    vocabularyDelete: vocabularyDelete,
    vocabularyUpdate: vocabularyUpdate
    /* Vocabulary: { */

    /*   async course(vocabulary) { */

    /*     const populated = await vocabulary.populate("course").execPopulate() */

    /*     return populated.course */

    /*   } */

    /* } */

  }
};
exports.vocabularyResolvers = vocabularyResolvers;