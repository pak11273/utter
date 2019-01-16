import {MODAL_CLOSE, MODAL_OPEN, MODAL_RESET} from "./types.js"

import {createReducer} from "../../utils/redux-utils.js"

const initialState = []

export function openModal(state, payload) {
  const {modalType, modalProps} = payload.payload

  // Always pushing a new modal onto the stack
  return state.concat({modalType, modalProps})
}

export function closeModal(state) {
  // Always popping the last modal off the stack
  const newState = state.slice()
  newState.pop()
  return newState
}

export function resetModal(state) {
  return state
}

export default createReducer(initialState, {
  [MODAL_OPEN]: openModal,
  [MODAL_CLOSE]: closeModal,
  [MODAL_RESET]: resetModal
})
