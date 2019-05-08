import * as yup from "yup"

const invalidLogin = "invalid login"

export const invalidEmail = "email must be a valid email"
export const emailNotLongEnough = "email must be at least 3 characters"
export const passwordNotLongEnough = "password must be at least 8 characters"
export const minChars = "Must be a minimum of 3 characters"
export const maxChars = "Cannot exceed 255 characters"

export const betaAccessSchema = yup.object().shape({
  key: yup.string().required("A beta key is required")
})

export const PasswordValidation = yup
  .string()
  .min(8, passwordNotLongEnough)
  .max(255)
  .matches(/[a-z]/, "One lowercase character is required.")
  .matches(/[A-Z]/, "One uppercase character is required.")
  .matches(
    /[a-zA-Z]+[^a-zA-Z\s]+/,
    "A number or special char (@,!,#, etc) is required."
  )
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

export const betaSignupSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail)
    .required("Email is required"),
  firstName: yup
    .string()
    .min(1, "minimum of one character")
    .max(255, maxChars)
    .required("A first name is required"),
  lastName: yup
    .string()
    .min(1, "minimum of one character")
    .max(255, maxChars)
    .required("A last name is required"),
  linkedIn: yup.string().max(255, maxChars),
  whyLearning: yup.string().max(1400, "maximum of 1400 characters"),
  nativeLang: yup.string().max(255, maxChars),
  currentlyLearning: yup.string().max(255, maxChars),
  howLongLearning: yup.string().max(255, maxChars),
  dayLearningHrs: yup.string().max(255, maxChars)
})

export const renewConfirmationSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail)
    .required("Email is required")
})
