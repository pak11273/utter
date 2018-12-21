import * as yup from "yup"

const invalidLogin = "invalid login"

export const invalidEmail = "email must be a valid email"
export const discriptionNotLongEnough =
  "Course name must be at least 10 characters"

export const courseCreateSchema = yup.object().shape({
  courseName: yup
    .string()
    .min(10, nameNotLongEnough)
    .max(100)
    .required("A course name is required"),
  description: yup
    .string()
    .min(100, discriptionNotLongEnough)
    .max(350)
    .required("A course description is required")
})
