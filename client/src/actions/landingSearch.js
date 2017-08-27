import {SET_SEARCH_TERM} from './types.js'

export const setSearchTerm = searchTerm => {
  return {type: SET_SEARCH_TERM, searchTerm}
}
