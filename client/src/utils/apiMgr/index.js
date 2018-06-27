import axios from 'axios'
import jwt from 'jsonwebtoken'

/* 
 * @param {object} state
 *
 */

export const fetchData = state => {
  const {url, data, params, cb} = state
  return axios.post(url, data)
}
