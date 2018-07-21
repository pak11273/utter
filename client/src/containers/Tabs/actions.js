import {TAB_SELECTED} from './types'

export function selectTab(tabName) {
  return {
    type: TAB_SELECTED,
    tabName
  }
}
