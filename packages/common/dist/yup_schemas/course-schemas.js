"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.courseSchema = exports.courseCreateSchema = exports.nameTooLong = exports.descriptionTooLong = exports.descriptionNotLongEnough = exports.titleNotLongEnough = void 0;

var yup = _interopRequireWildcard(require("yup"));

/* const invalidLogin = "invalid login" */

/* export const invalidEmail = "email must be a valid email" */
var titleNotLongEnough = "Course titles must be at least 10 characters";
exports.titleNotLongEnough = titleNotLongEnough;
var descriptionNotLongEnough = "Course description must be at least 100 characters";
exports.descriptionNotLongEnough = descriptionNotLongEnough;
var descriptionTooLong = "Course description cannot exceed 350 characters";
exports.descriptionTooLong = descriptionTooLong;
var nameTooLong = "Course name cannot exceed 100 characters";
exports.nameTooLong = nameTooLong;
var courseCreateSchema = yup.object().shape({
  title: yup.string().min(10, titleNotLongEnough).max(100, nameTooLong).required("A course title is required"),
  courseDescription: yup.string().min(100, descriptionNotLongEnough).max(350, descriptionTooLong).required("A course description is required"),
  usingLang: yup.array().min(1, "Pick at least 1 language").of(yup.object().shape({
    label: yup.string().required(),
    value: yup.string().required()
  }))
  /* teachingLang: yup.string().required("Teaching language is required") */

});
exports.courseCreateSchema = courseCreateSchema;
var courseSchema = yup.object().shape({
  title: yup.string().required("A course name is required").min(10, titleNotLongEnough).max(100, nameTooLong),
  courseDescription: yup.string().min(100, descriptionNotLongEnough).max(350, descriptionTooLong).required("A course description is required")
});
exports.courseSchema = courseSchema;