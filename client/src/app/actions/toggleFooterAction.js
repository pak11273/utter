import {TOGGLE_FOOTER} from '../types'

export function toggleFooter(bool) {
  return {
    type: TOGGLE_FOOTER,
    bool
  }
}
