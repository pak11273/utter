"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vocabularySchema = undefined;

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

var vocabularySchema = exports.vocabularySchema = yup.object().shape({
  level: yup.number().typeError("You must pick a level or create one.").moreThan(0, "Levels need to be more than 0").required("A level is required."),
  word: yup.string().typeError("Words must be letters.").max(100, "Words are limited to 100 characters.").required(),
  translation: yup.string().typeError("Translations must be letters.").max(100, "Translations are limited to 100 characters.").required()
});
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(vocabularySchema, "vocabularySchema", "src/yup_schemas/vocabulary-schemas.js");
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

  reactHotLoader.register(vocabularySchema, "vocabularySchema", "src/yup_schemas/vocabulary-schemas.js");
  leaveModule(module);
})();

;