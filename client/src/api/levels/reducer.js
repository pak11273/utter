import {createReducer} from '../../utils/reduxUtils.js'

import {LEVEL_SELECT} from './types.js'

const initialState = {
  currentLevel: null
}

export function selectLevel(state, payload) {
  const prevSelectedLevel = state.currentLevel
  const newSelectedLevel = payload.currentLevel

  const isSameLevel = prevSelectedLevel === newSelectedLevel

  return {
    ...state,
    // Deselect entirely if it's a second click on the same level,
    // otherwise go ahead and select the one that was clicked
    currentLevel: isSameLevel ? null : newSelectedLevel
  }
}

// TODO: not implemented yet
// export function startEditingLevel(state, payload) {
//   return {
//     ...state,
//     isEditing: true
//   }
// }

// export function stopEditingLevel(state, payload) {
//   return {
//     ...state,
//     isEditing: false
//   }
// }

// export function stopEditingIfDeleted(state, payload) {
//   const {itemType, itemID} = payload
//   const {currentLevel} = state

//   if (itemType === 'Level' && itemID === currentLevel) {
//     return {
//       ...state,
//       isEditing: false,
//       currentLevel: null
//     }
// }

// return state
// }

export default createReducer(initialState, {
  [LEVEL_SELECT]: selectLevel
  // [LEVEL_EDIT_START]: startEditingLevel,
  // [LEVEL_EDIT_STOP]: stopEditingLevel,
  // [ENTITY_DELETE]: stopEditingIfDeleted
})
