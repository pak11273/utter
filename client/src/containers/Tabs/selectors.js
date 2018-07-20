import {createSelector} from 'reselect'

export const selectTabs = state => {
  return state.tabsReducer
}

export const selectCurrentTab = createSelector(
  selectTabs,
  result => result.currentTab
)
