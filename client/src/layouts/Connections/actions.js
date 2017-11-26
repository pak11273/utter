import axios from 'axios'
import {LOAD_USER_PROFILE} from './types.js'

const loadUserProfile = id => {
  return dispatch => {
    axios
      .get(`/api/users/${id}`)
      .then(res => {
        console.log('id: ', res.data)
        return dispatch({type: LOAD_USER_PROFILE, payload: res.data})
      })
      .catch(err => {
        console.log('User Profile could not load:', err)
      })
  }
}

export {loadUserProfile}
