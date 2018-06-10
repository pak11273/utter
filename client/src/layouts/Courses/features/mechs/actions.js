import {MECH_SELECT} from './types.js'

export function selectMech(mechId) {
  return {
    type: MECH_SELECT,
    payload: {currentMech: mechID}
  }
}
