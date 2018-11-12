import * as yup from "yup"
import {emailNotLongEnough, passwordNotLongEnough} from "./error-messages.js"

const PasswordValidation = yup
  .string()
  .min(8, passwordNotLongEnough)
  .max(255)

export {PasswordValidation}
