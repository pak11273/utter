"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shuffleArray2 = exports.shuffleArray = void 0;

var shuffleArray = function shuffleArray(arr) {
  if (!arr) {
    return [{
      partsOfSpeech: "alphabet",
      word: "no entry"
    }];
  }

  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [arr[j], arr[i]];
    arr[i] = _ref[0];
    arr[j] = _ref[1];
  }

  return arr;
};

exports.shuffleArray = shuffleArray;

var shuffleArray2 = function shuffleArray2(arr) {
  arr.map(function (a) {
    return {
      sort: Math.random(),
      value: a
    };
  }).sort(function (a, b) {
    return a.sort - b.sort;
  }).map(function (a) {
    return a.value;
  });
  return arr;
};

exports.shuffleArray2 = shuffleArray2;