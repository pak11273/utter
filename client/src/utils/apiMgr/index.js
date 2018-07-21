import axios from 'axios'

/* 
 * @param {object} state
 *
 */

export const fetchData = state => {
  const {url, method, data, params, cb} = state
  return axios[method](url, data)
}
