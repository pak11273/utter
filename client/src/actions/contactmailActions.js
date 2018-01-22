import axios from 'axios'

export function contactmail(data) {
  return dispatch => {
    return axios.post('/mail/contactmail', data)
  }
}
