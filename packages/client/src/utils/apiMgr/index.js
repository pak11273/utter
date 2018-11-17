import axios from 'axios'

/* 
 * @param {object} state
 *
 */

export const fetchData = state => {
  const {url, method, data, params, cb} = state
  if (params) {
    const formattedParams = {params: params}
    return axios[method](url, formattedParams)
  }
  return axios[method](url, data)
}
