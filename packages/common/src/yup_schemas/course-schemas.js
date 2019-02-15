import * as yup from "yup"

/* const invalidLogin = "invalid login" */

/* export const invalidEmail = "email must be a valid email" */
export const nameNotLongEnough = "Course name must be at least 10 characters"
export const descriptionNotLongEnough =
  "Course description must be at least 100 characters"
export const descriptionTooLong =
  "Course description cannot exceed 350 characters"
export const nameTooLong = "Course name cannot exceed 100 characters"

export const courseCreateSchema = yup.object().shape({
  courseName: yup
    .string()
    .min(10, nameNotLongEnough)
    .max(100, nameTooLong)
    .required("A course name is required"),
  courseDescription: yup
    .string()
    .min(100, descriptionNotLongEnough)
    .max(350, descriptionTooLong)
    .required("A course description is required")
})
