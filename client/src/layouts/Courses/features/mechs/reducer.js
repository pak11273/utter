import {createReducer} from '../../../../utils/reducerUtils.js'

import {MECH_SELECT} from './types.js'

const initialState = {
  currentMech: null
}

export function selectMech(state, payload) {
  const prevSelectedMech = state.currentMech
  const newSelectedMech = payload.currentMech

  const isSameMech = prevSelectedMech === newSelectedMech

  return {
    // Deselect entirely if it's a second click on the same mech,
    // otherwise go ahead and select the one that was clicked
    currentMech: isSameMech ? null : newSelectedMech
  }
}

export default createReducer(initialState, {
  [MECH_SELECT]: selectMech
})
