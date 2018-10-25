import * as yup from "yup"
import {passwordNotLongEnough} from "./errorMessages.js"

export const registerPasswordValidation = yup
  .string()
  .min(3, passwordNotLongEnough)
  .max(255)
