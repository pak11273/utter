import {SET_SEARCH_TERM} from '../actions/landingSearch.js'

const DEFAULT_STATE = {
  searchTerm: 'hello dolly'
}

const setSearchTerm = (state, action) => {
  return Object.assign({}, state, {searchTerm: action.searchTerm})
}

export default (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return setSearchTerm(state, action)
    default:
      return state
  }
}
