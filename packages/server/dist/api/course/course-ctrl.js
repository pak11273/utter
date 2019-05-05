"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _faker2 = _interopRequireDefault(require("faker"));

var _cuid = _interopRequireDefault(require("cuid"));

var _lodash = require("lodash");

var _courseModel = _interopRequireDefault(require("./course-model.js"));

var _data = require("../../seeds/data.js");

var ObjectId = _mongoose.default.Types.ObjectId;
var _default = {
  faker: function faker(req, res, next) {
    for (var i = 0; i < 1000; ++i) {
      var course = new _courseModel.default();
      course.title = _faker2.default.random.arrayElement(["Aenean Donec venenatis", "Praesent egestas neque", "Fusce vel duii Fusce vel dui", "Nullam accumsan lorem", "Curabitur a felis", "Pellentesque auctor neque", "Fusce vel duFusce vel duii", "Mauris sollicitudin fermentum", "Suspendisse enim turpis", "Mauris sollicitudin fermentum", "Nullam nuNullam nulla ero eros"]);
      course.owner = _faker2.default.random.arrayElement(["5caa11c126bd462e4023657b", "5ccd04389b251025231a8446", "5ccd08c796e018284f6180a5", "5ccd041b9b251025231a8445", "5ccd0a0f96e018284f6180a6", "5ccd03d29b251025231a8444"]);
      course.mode = "edit";
      course.resource = _faker2.default.random.arrayElement(["top", "h-dog", "HELLO", "Bye", "_what_", "...nah", " ", " top "]);
      course.teachingLang = _faker2.default.random.arrayElement(_data.languageOptions);
      course.usingLang = _faker2.default.random.arrayElement(_data.languageOptions);
      course.subscribers = _faker2.default.random.number();
      course.courseId = (0, _cuid.default)();
      course.title = _faker2.default.random.arrayElement(_data.courseTitles);
      course.courseDescription = _faker2.default.lorem.paragraph();
      course.courseImage = _faker2.default.image.image();
      course.save(function (err) {
        if (err) throw err;
      });
    }

    res.json(course);
  }
};
exports.default = _default;