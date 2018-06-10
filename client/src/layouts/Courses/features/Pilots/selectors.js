import {createSelector} from 'reselect'

export const selectPilots = state => {
  return state.pilotReducer
}

export const selectCurrentPilot = createSelector(selectPilots, pilots => {
  return pilots.currentPilot
})

export const selectIsEditingPilot = createSelector(
  selectPilots,
  pilots => pilots.isEditing
)
