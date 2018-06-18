import {MECH_SELECT} from './types.js'

export function selectMech(mechID) {
  return {
    type: MECH_SELECT,
    payload: {currentMech: mechID}
  }
}
