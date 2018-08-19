import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import isNaN from 'lodash/isNaN'
import {store} from '../../store.js'

export const validateInput = state => {
  let errors = {}
  state.levels.map(item => {
    if (isNil(item.level) || item.level === '') {
      errors.level = {
        cuid: item._id,
        message: 'Level numbers are required.'
      }
    } else if (isNaN(item.level) || item.level <= 0) {
      errors.level = {
        cuid: item._id,
        message: 'Levels must be numbers and greater than 0'
      }
    }
  })

  // if (Validator.isEmpty(state.courseName)) {
  //   errors.courseName = {message: 'This field is required.'}
  // } else if (state.courseName.length > 100 || state.courseName.length < 10) {
  //   errors.courseName = {
  //     message: 'Course name needs to be 10 to 100 characters in length.'
  //   }
  // }

  // if (Validator.isEmpty(state.courseDescription)) {
  //   errors.courseDescription = {message: 'This field is required.'}
  // } else if (
  //   state.courseDescription.length > 350 ||
  //   state.courseDescription.length < 100
  // ) {
  //   errors.courseDescription = {
  //     message: 'Course description needs to be 100 to 350 characters in length.'
  //   }
  // }

  return {errors, isValid: isEmpty(errors)}
}
