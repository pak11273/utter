import {createSelector} from 'reselect'

export const selectPilots = state => state.pilots

export const selectCurrentPilot = createSelector(selectPilots, pilots => {
  return pilots.currentPilot
})

export const selectIsEditingPilot = createSelector(
  selectPilots,
  pilots => pilots.isEditing
)
