import {createReducer} from '../../utils/reducerUtils.js'

import {TERM_SELECT, TERM_EDIT_START, TERM_EDIT_STOP} from './types.js'

import {ENTITY_DELETE} from '../entities/types.js'

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

export function startEditingTerm(state, payload) {
  return {
    ...state,
    isEditing: true
  }
}

export function stopEditingTerm(state, payload) {
  return {
    ...state,
    isEditing: false
  }
}

export function stopEditingIfDeleted(state, payload) {
  const {itemType, itemID} = payload
  const {currentTerm} = state

  if (itemType === 'Term' && itemID === currentTerm) {
    return {
      ...state,
      isEditing: false,
      currentTerm: null
    }
  }

  return state
}

export default createReducer(initialState, {
  [TERM_SELECT]: selectTerm,
  [TERM_EDIT_START]: startEditingTerm,
  [TERM_EDIT_STOP]: stopEditingTerm,
  [ENTITY_DELETE]: stopEditingIfDeleted
})
