import * as yup from "yup"
/* import {passwordNotLongEnough} from "./errorMessages.js" */

export const fieldNotLongEnough = "This field must be at least 10 characters"
export const descriptionNotLongEnough =
  "Course description must be at least 100 characters"
export const descriptionTooLong =
  "Course description cannot exceed 350 characters"
export const fieldTooLong = "This field cannot exceed 100 characters"

export const registerPasswordValidation = yup
  .string()
  /* .min(3, passwordNotLongEnough) */
  .max(255)

export const courseVocabularySchema = yup.object().shape({
  word: yup
    .string()
    .min(1, fieldNotLongEnough)
    .max(100, fieldTooLong)
    .required("A word is required"),
  translation: yup
    .string()
    .min(1, fieldNotLongEnough)
    .max(100, fieldTooLong)
    .required("A translation is required"),
  audio: yup
    .string()
    .url()
    .min(1, fieldNotLongEnough)
    .max(100, fieldTooLong)
})

export const courseSchema = yup.object().shape({
  title: yup
    .string()
    .required("A course title is required")
    .min(10, fieldNotLongEnough)
    .max(100, fieldTooLong),
  courseDescription: yup
    .string()
    .min(100, descriptionNotLongEnough)
    .max(350, descriptionTooLong)
    .required("A course description is required")
})
