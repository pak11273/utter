import * as yup from "yup"

export const levelSchema = yup.object().shape({
  level: yup
    .number()
    .typeError("Levels must be whole numbers.")
    .max(1000, "Courses are limited to 1000 levels.")
    .moreThan(0, "Levels need to be more than 0")
    .required("A level is required."),
  title: yup
    .string()
    .typeError("Titles must be letters.")
    .max(100, "Titles are limited to 100 characters.")
    .required()
})
