import axios from 'axios'

exports.login = data => {
  return dispatch => {
    return axios.post('auth', data)
  }
}
