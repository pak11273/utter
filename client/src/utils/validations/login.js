import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

exports.validateInput = state => {
  let errors = {}

  if (Validator.isEmpty(state.identifier)) {
    errors.identifier = {message: "can't be blank"}
  }

  if (Validator.isEmpty(state.password)) {
    errors.password = {message: "can't be blank"}
  }

  return {errors, isValid: isEmpty(errors)}
}
