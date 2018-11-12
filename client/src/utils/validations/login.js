import Validator from "validator"
import isEmpty from "lodash/isEmpty"

export const validateInput = state => {
  const errors = {}

  if (Validator.isEmpty(state.identifier)) {
    errors.identifier = {message: "can't be blank"}
  }

  if (Validator.isEmpty(state.password)) {
    errors.password = {message: "can't be blank"}
  }

  return {errors, isValid: isEmpty(errors)}
}
