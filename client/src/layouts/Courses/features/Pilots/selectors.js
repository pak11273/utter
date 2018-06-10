import {createSelector} from 'reselect'

export const selectPilots = state => {
  console.log('state: ', state.pilotReducer)
  return state.pilotReducer
}

export const selectCurrentPilot = createSelector(selectPilots, pilots => {
  console.log('piolot: ', pilots.currentPilot)
  return pilots.currentPilot
})

export const selectIsEditingPilot = createSelector(
  selectPilots,
  pilots => pilots.isEditing
)
