import {MODAL_CLOSE, MODAL_OPEN, MODAL_RESET} from './types.js'

export function openModal(modalType, modalProps) {
  return {
    type: MODAL_OPEN,
    payload: {modalType, modalProps}
  }
}

export function closeModal() {
  return {
    type: MODAL_CLOSE
  }
}

export function resetModal() {
  return {
    type: MODAL_RESET
  }
}
