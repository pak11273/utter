import Validator from "validator"
import isEmpty from "lodash/isEmpty"

export const validateInput = state => {
  const errors = {}

  if (!Validator.isEmail(state.email)) {
    errors.email = {message: "Email is invalid"}
  }

  if (Validator.isEmpty(state.email)) {
    errors.email = {message: "This field is required."}
  }

  if (Validator.isEmpty(state.username)) {
    errors.username = {message: "This field is required."}
  }

  if (Validator.isEmpty(state.password)) {
    errors.password = {message: "This field is required."}
  }

  if (Validator.isEmpty(state["password confirmation"])) {
    errors.passwordConfirmation = {message: "This field is required."}
  }

  if (!Validator.equals(state.password, state["password confirmation"])) {
    errors.passwordConfirmation = {message: "Passwords must match"}
  }

  return {errors, isValid: isEmpty(errors)}
}
