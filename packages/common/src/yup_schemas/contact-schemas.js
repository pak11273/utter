import * as yup from "yup"

const invalidEmail = "email must be a valid email"

export const contactSchema = yup.object().shape({
  name: yup.string().max(255),
  subject: yup.string().max(255),
  email: yup
    .string()
    .max(255)
    .email(invalidEmail),
  message: yup.string().max(3000)
})
