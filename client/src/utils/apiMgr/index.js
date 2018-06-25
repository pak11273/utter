import axios from 'axios'
import jwt from 'jsonwebtoken'
import setAuthorizationToken from '../../utils/setAuthorizationToken.js'
import userActions from '../../api/user/actions.js'

/* 
 * @param {object} state
 *
 */

export const fetchData = state => {
  const {url, data, params, cb} = state
  return axios.post(url, data)
  // .then(res => {
  //   const token = res.data.token
  //   localStorage.setItem('jwtToken', token)
  //   setAuthorizationToken(token)
  //   const user = jwt.decode(token)
  //   return res
  // })
  // // TODO: put this err in store
  // .catch(err => {
  //   return err
  // })
}
