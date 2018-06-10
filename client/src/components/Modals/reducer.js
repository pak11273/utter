import {MODAL_CLOSE, MODAL_OPEN} from './types.js'

import {createReducer} from '../../../src/utils/reducerUtils.js'

const initialState = []

export function openModal(state, payload) {
  const {modalType, modalProps} = payload
  // Always pushing a new modal onto the stack
  return state.concat({modalType, modalProps})
}

export function closeModal(state, payload) {
  // Always popping the last modal off the stack
  const newState = state.slice()
  newState.pop()
  return newState
}

export default createReducer(initialState, {
  [MODAL_OPEN]: openModal,
  [MODAL_CLOSE]: closeModal
})
