import * as yup from "yup"
import {passwordNotLongEnough} from "./errorMessages.js"

export const titleNotLongEnough = "Course titles must be at least 10 characters"
export const descriptionNotLongEnough =
  "Course description must be at least 100 characters"
export const descriptionTooLong =
  "Course description cannot exceed 350 characters"
export const nameTooLong = "Course name cannot exceed 100 characters"

export const registerPasswordValidation = yup
  .string()
  .min(3, passwordNotLongEnough)
  .max(255)

export const courseCreateSchema = yup.object().shape({
  title: yup
    .string()
    .min(10, titleNotLongEnough)
    .max(100, nameTooLong)
    .required("A course title is required"),
  courseDescription: yup
    .string()
    .min(100, descriptionNotLongEnough)
    .max(350, descriptionTooLong)
    .required("A course description is required"),
  usingLang: yup.string().required("This field is required."),
  teachingLang: yup.string().required("This field is required.")
})

export const courseSchema = yup.object().shape({
  title: yup
    .string()
    .required("A course title is required")
    .min(10, titleNotLongEnough)
    .max(100, nameTooLong),
  courseDescription: yup
    .string()
    .min(100, descriptionNotLongEnough)
    .max(350, descriptionTooLong)
    .required("A course description is required")
})
