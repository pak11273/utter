import orm from '../../../../app/schema'
import {createConditionalSliceReducer} from '../../../../utils/reducerUtils.js'

import {UNIT_INFO_UPDATE, UNIT_INFO_SET_COLOR} from './types.js'

function updateUnitInfo(state, payload) {
  const session = orm.session(state)
  const {Unit} = session

  const currentUnit = Unit.all().first()

  if (currentUnit) {
    currentUnit.update(payload)
  }

  return session.state
}

function setUnitColor(state, payload) {
  const {color} = payload
  const session = orm.session(state)
  const {Unit} = session

  const currentUnit = Unit.all().first()

  if (currentUnit) {
    currentUnit.color = color
  }

  return session.state
}

export default createConditionalSliceReducer('entities', {
  [UNIT_INFO_UPDATE]: updateUnitInfo,
  [UNIT_INFO_SET_COLOR]: setUnitColor
})
