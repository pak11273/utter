import {createSelector} from 'reselect'

export const selectTerm = state => state.termsReducer

export const selectCurrentTerm = createSelector(
  selectTerm,
  terms => terms.currentTerm
)

// export const selectIsEditingTerm = createSelector(
//   selectTerm,
//   terms => terms.isEditing
// )
