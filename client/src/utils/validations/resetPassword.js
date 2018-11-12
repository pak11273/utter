import Validator from "validator"
import isEmpty from "lodash/isEmpty"

export const validateInput = state => {
  const errors = {}

  if (Validator.isEmpty(state.password)) {
    errors.password = {message: "can't be blank"}
  }

  if (Validator.isEmpty(state.passwordConfirmation)) {
    errors.passwordConfirmation = {message: "can't be blank"}
  }

  if (!Validator.equals(state.password, state.passwordConfirmation)) {
    errors.passwordConfirmation = {message: "Passwords must match"}
  }

  return {errors, isValid: isEmpty(errors)}
}
