import {createSelector} from 'reselect'

export const selectLevels = state => {
  return state.levelReducer
}

export const selectCurrentLevel = createSelector(selectLevels, levels => {
  return levels.currentLevel
})

export const selectIsEditingLevel = createSelector(
  selectLevels,
  levels => levels.isEditing
)
