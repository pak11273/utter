import axios from 'axios'
import setAuthorizationToken from '../utils/setAuthorizationToken.js'

export default function login(data) {
  return dispatch => {
    return axios.post('auth/signin', data).then(res => {
      const token = res.data.token
      localStorage.setItem('jwtToken', token)
      setAuthorizationToken(token)
    })
  }
}
