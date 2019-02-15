import * as yup from "yup"

const invalidLogin = "invalid login"

export const invalidEmail = "email must be a valid email"
export const emailNotLongEnough = "email must be at least 3 characters"
export const passwordNotLongEnough = "password must be at least 8 characters"

export const PasswordValidation = yup
  .string()
  .min(8, passwordNotLongEnough)
  .max(255)
  .required("Password is required")

export const changePasswordSchema = yup.object().shape({
  password: PasswordValidation,
  "password confirmation": yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Password confirmation is required")
})

export const loginSchema = yup.object().shape({
  "username or email": yup
    .string()
    .min(3, invalidLogin)
    .max(255, invalidLogin)
    .required("Username or Email is required"),
  password: PasswordValidation
})

export const signupSchema = yup.object().shape({
  username: yup
    .string()
    .min(3)
    .max(255)
    .required("Username is required"),
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail)
    .required("Email is required"),
  password: PasswordValidation,
  "password confirmation": yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Password confirmation is required")
})
