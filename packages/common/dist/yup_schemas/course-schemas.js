"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.courseSchema = exports.courseCreateSchema = exports.nameTooLong = exports.descriptionTooLong = exports.descriptionNotLongEnough = exports.titleNotLongEnough = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var yup = _interopRequireWildcard(require("yup"));

var titleNotLongEnough = "Course titles must be at least 10 characters";
exports.titleNotLongEnough = titleNotLongEnough;
var descriptionNotLongEnough = "Course description must be at least 100 characters";
exports.descriptionNotLongEnough = descriptionNotLongEnough;
var descriptionTooLong = "Course description cannot exceed 350 characters";
exports.descriptionTooLong = descriptionTooLong;
var nameTooLong = "Course name cannot exceed 100 characters";
exports.nameTooLong = nameTooLong;
var courseCreateSchema = yup.object().shape((0, _defineProperty2["default"])({
  title: yup.string().min(10, titleNotLongEnough).max(100, nameTooLong).required("A course title is required"),
  courseDescription: yup.string().min(100, descriptionNotLongEnough).max(350, descriptionTooLong).required("A course description is required"),
  topics: yup.array().min(3, "Pick at least 3 tags").of(yup.object().shape({
    label: yup.string().required(),
    value: yup.string().required()
  })),
  usingLang: yup.array().min(1, "Pick at least 1 language").of(yup.object().shape({
    label: yup.string().required(),
    value: yup.string().required()
  })).required("This field is required.")
}, "courseDescription", yup));
exports.courseCreateSchema = courseCreateSchema;
var courseSchema = yup.object().shape({
  title: yup.string().required("A course title is required").min(10, titleNotLongEnough).max(100, nameTooLong),
  courseDescription: yup.string().min(100, descriptionNotLongEnough).max(350, descriptionTooLong).required("A course description is required")
});
exports.courseSchema = courseSchema;