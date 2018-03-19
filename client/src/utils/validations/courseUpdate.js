import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import {store} from '../../store.js'

exports.validateInput = state => {
  let errors = {}

  state.levels.map(item => {
    if (isNil(item.level) || item.level === '') {
      console.log('its EMPTY!')
      errors.level = {message: 'This field is required.'}
    } else if (isNaN(item.level) || item.level <= 0) {
      errors.level = {
        message: 'Levels must be numbers and greater than 0'
      }
      console.log('Levels must be numbers and greater than 0')
    }
    // if (isNaN(item.level) || item.level <= 0) {
    //   console.log('negative num')
    //   errors.level = {
    //     message: 'Levels must be numbers and greater than 0'
    //   }
    //   console.log('n2nd part ')
    //   console.log('item: ', item)
    //   console.log('level: : ', item.level)
    //   console.log('type: : ', typeof item.level)
    // }
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
