"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateToString = void 0;

var dateToString = function dateToString(date) {
  new Date(date).toISOString();
};

exports.dateToString = dateToString;