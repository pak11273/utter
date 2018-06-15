import {createSelector} from 'reselect'

export const selectTerms = state => state.termsReducer

export const selectCurrentTerm = createSelector(
  selectTerms,
  terms => terms.currentTerm
)

export const selectIsEditingTerm = createSelector(
  selectTerms,
  terms => terms.isEditing
)
