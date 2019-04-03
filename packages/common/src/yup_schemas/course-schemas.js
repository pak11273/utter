import * as yup from "yup"

/* const invalidLogin = "invalid login" */

/* export const invalidEmail = "email must be a valid email" */
export const titleNotLongEnough = "Course titles must be at least 10 characters"
export const descriptionNotLongEnough =
  "Course description must be at least 100 characters"
export const descriptionTooLong =
  "Course description cannot exceed 350 characters"
export const nameTooLong = "Course name cannot exceed 100 characters"

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
  topics: yup
    .array()
    .min(3, "Pick at least 3 tags")
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required()
      })
    ),
  usingLang: yup
    .array()
    .min(1, "Pick at least 1 language")
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required()
      })
    )
    .required("This field is required."),
  courseDescription: yup
  /* teachingLang: yup.string().required("Teaching language is required") */
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
