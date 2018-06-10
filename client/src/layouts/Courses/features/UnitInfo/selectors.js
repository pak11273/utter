import {createSelector} from 'reselect'
import {getEntitiesSession} from '../../../../containers/Entities/selectors.js'

export const selectUnitInfo = state => state.unitInfo

export const selectCurrentUnitInfo = createSelector(
  getEntitiesSession,
  session => {
    const {Unit} = session
    const currentUnitModel = Unit.all().first()

    let currentUnitInfo = null

    if (currentUnitModel) {
      currentUnitInfo = currentUnitModel.ref
    }

    return currentUnitInfo
  }
)
