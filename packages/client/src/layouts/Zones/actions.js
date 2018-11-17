import axios from 'axios'
import {LOAD_USER_PROFILE} from './types.js'

const loadUserProfile = id => {
  return dispatch => {
    axios
      .get(`/api/users/${id}`)
      .then(res => {
        return dispatch({type: LOAD_USER_PROFILE, payload: res.data})
      })
      .catch(err => {
        console.log('User Profile could not load:', err)
      })
  }
}

const addCourse = (id, course) => {
  const userData = {
    courses: [{name: course, level: 1}]
  }
  return dispatch => {
    axios
      .put(`/api/users/${id}`, userData)
      .then(res => {
        console.log('Course was added')
      })
      .catch(err => {
        console.log('Course could not be added:', err)
      })
  }
}

export {loadUserProfile, addCourse}
