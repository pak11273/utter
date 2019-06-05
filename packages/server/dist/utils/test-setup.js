"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var mongoose = require("mongoose");

module.exports = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          mongoose.connect("mongodb://localhost/test", {
            useCreateIndex: true,
            useNewUrlParser: true
          }).then(function (connection) {
            mongoose.connection.db.dropDatabase();
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));