"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vocabularySchema = void 0;

var yup = _interopRequireWildcard(require("yup"));

var vocabularySchema = yup.object().shape({
  level: yup.number().typeError("You must pick a level or create one.").moreThan(0, "Levels need to be more than 0").required("A level is required."),
  word: yup.string().typeError("Words must be letters.").max(100, "Words are limited to 100 characters.").required(),
  translation: yup.string().typeError("Translations must be letters.").max(100, "Translations are limited to 100 characters.").required()
});
exports.vocabularySchema = vocabularySchema;