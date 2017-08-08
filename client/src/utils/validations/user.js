import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

exports.validateInput = state => {
  let errors = {}

  if (!Validator.isEmail(state.email)) {
    errors.email = {message: 'Email is invalid'}
  }

  if (Validator.isEmpty(state.email)) {
    errors.email = {message: "can't be blank"}
  }

  if (Validator.isEmpty(state.username)) {
    errors.username = {message: "can't be blank"}
  }

  if (Validator.isEmpty(state.password)) {
    errors.password = {message: "can't be blank"}
  }

  if (Validator.isEmpty(state.passwordConfirmation)) {
    errors.passwordConfirmation = {message: "can't be blank"}
  }

  if (!Validator.equals(state.password, state.passwordConfirmation)) {
    errors.passwordConfirmation = {message: 'Passwords must match'}
  }

  return {errors, isValid: isEmpty(errors)}
}
