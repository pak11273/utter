import axios from 'axios'

export function sendmail(data) {
  return dispatch => {
    return axios.post('/sendmail', data)
  }
}
