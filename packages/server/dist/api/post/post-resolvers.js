"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postResolvers = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _config = _interopRequireDefault(require("../../config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _courseModel = _interopRequireDefault(require("../course/course-model"));

var _postModel = _interopRequireDefault(require("./post-model"));

var _resolverFunctions = require("../shared/resolver-functions.js");

var escapeRegex = function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

var Post =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_, args, _ref) {
    var user;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = _ref.user;
            console.log("args: ", args);
            return _context.abrupt("return", {
              id: "jsldjfsjdlj",
              title: "ehllo",
              views: 3,
              user_id: "lksjdflksjdljfklj"
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function Post(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var allPosts =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(_, args, _ref3) {
    var user;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = _ref3.user;
            console.log("args: ", args);
            /* const post = await Post.findById(postId).exec() */

            /* if (!post) { */

            /*   throw new Error("Cannot find post with id") */

            /* } */

            return _context2.abrupt("return", [{}]);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function allPosts(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var _allPostsMeta =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(_, args, _ref5) {
    var user;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            user = _ref5.user;
            console.log("hello");
            /* const post = await Post.findById(postId).exec() */

            /* if (!post) { */

            /*   throw new Error("Cannot find post with id") */

            /* } */

            return _context3.abrupt("return", {
              count: 3
            });

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function _allPostsMeta(_x7, _x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();

var createPost =
/*#__PURE__*/
function () {
  var _ref8 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(_, args, _ref7) {
    var user;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            user = _ref7.user;
            console.log("hello");
            return _context4.abrupt("return", {
              id: "jsldjfsjdlj",
              title: "ehllo",
              views: 3,
              user_id: "lksjdflksjdljfklj"
            });

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function createPost(_x10, _x11, _x12) {
    return _ref8.apply(this, arguments);
  };
}();

var updatePost =
/*#__PURE__*/
function () {
  var _ref10 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(_, args, _ref9) {
    var user;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            user = _ref9.user;
            console.log("hello");
            return _context5.abrupt("return", {
              id: "jsldjfsjdlj",
              title: "ehllo",
              views: 3,
              user_id: "lksjdflksjdljfklj"
            });

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function updatePost(_x13, _x14, _x15) {
    return _ref10.apply(this, arguments);
  };
}();

var deletePost =
/*#__PURE__*/
function () {
  var _ref12 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee6(_, args, _ref11) {
    var user;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            user = _ref11.user;
            console.log("hello");
            return _context6.abrupt("return", {
              id: "jsldjfsjdlj",
              title: "ehllo",
              views: 3,
              user_id: "lksjdflksjdljfklj"
            });

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function deletePost(_x16, _x17, _x18) {
    return _ref12.apply(this, arguments);
  };
}();

var postResolvers = {
  Query: {
    Post: Post,
    allPosts: allPosts,
    _allPostsMeta: _allPostsMeta
  },
  Mutation: {
    createPost: createPost,
    updatePost: updatePost,
    deletePost: deletePost
  }
};
exports.postResolvers = postResolvers;