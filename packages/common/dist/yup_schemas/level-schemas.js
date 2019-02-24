"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.levelSchema = undefined;

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _yup = require("yup");

var yup = _interopRequireWildcard(_yup);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var levelSchema = exports.levelSchema = yup.object().shape({
  level: yup.number().typeError("Levels must be whole numbers.").max(1000, "Courses are limited to 1000 levels.").moreThan(0, "Levels need to be more than 0").required("A level is required."),
  title: yup.string().typeError("Titles must be letters.").max(100, "Titles are limited to 100 characters.").required()
});
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(levelSchema, "levelSchema", "src/yup_schemas/level-schemas.js");
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

  reactHotLoader.register(levelSchema, "levelSchema", "src/yup_schemas/level-schemas.js");
  leaveModule(module);
})();

;