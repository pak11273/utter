import axios from 'axios'

exports.createEvent = data => {
  return dispatch => {
    return axios.post('api/events', data)
  }
}
