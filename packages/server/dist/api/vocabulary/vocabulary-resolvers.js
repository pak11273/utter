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
            arrayOfErrors = [];
            _context.prev = 1;
            _context.next = 4;
            return _vocabularyModel.default.findByIdAndUpdate(args._id, args, {
              new: true
            }).lean();

          case 4:
            vocabulary = _context.sent;
            return _context.abrupt("return", {
              vocabulary: vocabulary,
              errors: arrayOfErrors
            });

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", {
              vocabulary: null,
              errors: arrayOfErrors
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
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
  _regenerator.default.mark(function _callee4(_, args, ctx, info) {
    var arrayOfErrors, all;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            arrayOfErrors = [];
            _context4.prev = 1;
            _context4.next = 4;
            return new Promise(
            /*#__PURE__*/
            function () {
              var _ref3 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee3(resolve) {
                var result;
                return _regenerator.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return cloudinary.uploader.destroy(folder + "/" + args.public_id, {
                          invalidate: true,
                          resource_type: "video"
                        },
                        /*#__PURE__*/
                        function () {
                          var _ref4 = (0, _asyncToGenerator2.default)(
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
                                    resolve({
                                      vocabulary: vocabulary,
                                      errors: arrayOfErrors
                                    });

                                  case 6:
                                  case "end":
                                    return _context2.stop();
                                }
                              }
                            }, _callee2);
                          }));

                          return function (_x10, _x11) {
                            return _ref4.apply(this, arguments);
                          };
                        }());

                      case 2:
                        result = _context3.sent;

                      case 3:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x9) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 4:
            all = _context4.sent;
            return _context4.abrupt("return", all);

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            console.log("err: ", _context4.t0);
            arrayOfErrors.push({
              path: "audio",
              message: _context4.t0
            });
            return _context4.abrupt("return", {
              vocabulary: null,
              errors: arrayOfErrors
            });

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));

  return function vocabularyAudioDelete(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var vocabularyCreate =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(_, args, ctx, info) {
    var arrayOfErrors, input, userId, user, newVocabulary, vocabulary, level;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            arrayOfErrors = [];
            input = args.input;
            console.log("input: ", input);
            _context5.prev = 3;

            if (ctx.isAuth) {
              _context5.next = 6;
              break;
            }

            throw new Error("You need to be registered to create a course.");

          case 6:
            userId = ctx.req.token._id;
            _context5.next = 9;
            return _userModel.default.findById(userId, function (err, res) {
              if (err) return err;
              return res;
            });

          case 9:
            user = _context5.sent;
            newVocabulary = new _vocabularyModel.default({
              audioUrl: input.audioUrl,
              level: input.level,
              gender: input.gender,
              partsOfSpeech: input.partsOfSpeech,
              translation: input.translation,
              word: input.word
            });
            _context5.next = 13;
            return newVocabulary.save();

          case 13:
            vocabulary = _context5.sent;
            _context5.next = 16;
            return _levelModel.default.findById(input.level);

          case 16:
            level = _context5.sent;
            level.vocabulary.push(vocabulary);
            level.save();

            if (level) {
              _context5.next = 21;
              break;
            }

            throw new Error("Level not found.");

          case 21:
            return _context5.abrupt("return", {
              vocabulary: vocabulary,
              errors: arrayOfErrors
            });

          case 24:
            _context5.prev = 24;
            _context5.t0 = _context5["catch"](3);
            throw _context5.t0;

          case 27:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 24]]);
  }));

  return function vocabularyCreate(_x12, _x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

var getVocabulary =
/*#__PURE__*/
function () {
  var _ref8 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee6(_, _ref6, _ref7) {
    var level, user, vocabulary;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            level = _ref6.level;
            user = _ref7.user;
            _context6.next = 4;
            return _vocabularyModel.default.findById(level).exec();

          case 4:
            vocabulary = _context6.sent;

            if (vocabulary) {
              _context6.next = 7;
              break;
            }

            throw new Error("Cannot find vocabulary with id");

          case 7:
            return _context6.abrupt("return", vocabulary);

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getVocabulary(_x16, _x17, _x18) {
    return _ref8.apply(this, arguments);
  };
}();

var vocabularyDelete =
/*#__PURE__*/
function () {
  var _ref9 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee8(_, args, ctx) {
    var arrayOfErrors, token, user, word, level;
    return _regenerator.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            console.log("deleted args; ", args);
            arrayOfErrors = [];

            if (!(token === "null")) {
              _context8.next = 4;
              break;
            }

            return _context8.abrupt("return", new Error("You need to be registered to view this resource."));

          case 4:
            token = ctx.req.headers.authorization;
            console.log("token; ", token);
            _context8.next = 8;
            return (0, _resolverFunctions.userByToken)(token, function (err, res) {
              if (err) return err;
              return res;
            });

          case 8:
            user = _context8.sent;
            _context8.next = 11;
            return _vocabularyModel.default.findOneAndDelete({
              _id: args._id
            }).lean();

          case 11:
            word = _context8.sent;
            console.log("word; ", word);
            _context8.next = 15;
            return _levelModel.default.findById(word.level);

          case 15:
            level = _context8.sent;
            level.vocabulary.pull(word._id);
            level.save();
            console.log("level: ", level); // delete from cdn

            _context8.next = 21;
            return cloudinary.uploader.destroy(folder + "/" + args.public_id, {
              invalidate: true,
              resource_type: "video"
            },
            /*#__PURE__*/
            function () {
              var _ref10 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee7(err, result) {
                return _regenerator.default.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        if (!err) {
                          _context7.next = 2;
                          break;
                        }

                        throw err;

                      case 2:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              }));

              return function (_x22, _x23) {
                return _ref10.apply(this, arguments);
              };
            }());

          case 21:
            console.log("final result: ", word);

            if (!word) {
              arrayOfErrors.push({
                path: "word",
                message: "An Error has occured.  Please contact technical support."
              });
            }

            return _context8.abrupt("return", {
              word: word,
              errors: arrayOfErrors
            });

          case 24:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function vocabularyDelete(_x19, _x20, _x21) {
    return _ref9.apply(this, arguments);
  };
}();

var vocabularyUpdate =
/*#__PURE__*/
function () {
  var _ref12 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee9(_, _ref11) {
    var input, arrayOfErrors, _id, update, updatedWord;

    return _regenerator.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            input = _ref11.input;
            console.log("input: ", input);
            _context9.prev = 2;
            arrayOfErrors = [];
            _id = input._id, update = (0, _objectWithoutProperties2.default)(input, ["_id"]);
            _context9.next = 7;
            return _vocabularyModel.default.findByIdAndUpdate(_id, update, {
              new: true
            }).exec();

          case 7:
            updatedWord = _context9.sent;
            return _context9.abrupt("return", {
              vocabulary: updatedWord,
              errors: arrayOfErrors
            });

          case 11:
            _context9.prev = 11;
            _context9.t0 = _context9["catch"](2);
            return _context9.abrupt("return", {
              vocabulary: null,
              errors: [{
                message: _context9.t0
              }]
            });

          case 14:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[2, 11]]);
  }));

  return function vocabularyUpdate(_x24, _x25) {
    return _ref12.apply(this, arguments);
  };
}();

var getVocabularies =
/*#__PURE__*/
function () {
  var _ref13 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee10(_, args, ctx, info) {
    var arrayOfErrors, result;
    return _regenerator.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            arrayOfErrors = [];
            _context10.next = 3;
            return _levelModel.default.findById(args.level).populate("vocabulary").lean();

          case 3:
            result = _context10.sent;
            return _context10.abrupt("return", {
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
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function getVocabularies(_x26, _x27, _x28, _x29) {
    return _ref13.apply(this, arguments);
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