import {createReducer} from "../../utils/redux-utils.js"

/* import {TERM_SELECT, TERM_EDIT_START, TERM_EDIT_STOP} from './types.js' */
import {TERM_SELECT} from "./types.js"

/* import {ENTITY_DELETE} from "../entities/types.js" */

const initialState = {
  currentTerm: null,
  isEditing: false
}

export function selectTerm(state, payload) {
  const prevSelectedTerm = state.currentTerm
  const newSelectedTerm = payload.currentTerm

  const isSameTerm = prevSelectedTerm === newSelectedTerm

  return {
    ...state,
    // Deselect entirely if it's a second click on the same term,
    // otherwise go ahead and select the one that was clicked
    currentTerm: isSameTerm ? null : newSelectedTerm
  }
}

export default createReducer(initialState, {
  [TERM_SELECT]: selectTerm
})
