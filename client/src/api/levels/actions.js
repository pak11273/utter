import cuid from 'cuid'

// TODO: implement editing feature
// import {
//   editExistingItem,
//   editNewItem,
//   applyItemEdits,
//   stopEditingItem
// } from 'features/editing/editingActions'

import {LEVEL_SELECT, LEVEL_EDIT_START, LEVEL_EDIT_STOP} from './types.js'

import {selectCurrentLevel, selectIsEditingLevel} from './selectors'
import {
  getEntitiesSession,
  getUnsharedEntitiesSession
} from '../../api/entities/selectors.js'

export function selectLevel(levelID) {
  return (dispatch, getState) => {
    const state = getState()
    const isEditing = selectIsEditingLevel(state)

    if (isEditing) {
      dispatch(cancelEditingLevel())
    }

    dispatch({
      type: LEVEL_SELECT,
      payload: {currentLevel: levelID}
    })
  }
}

export function startEditingLevel() {
  return (dispatch, getState) => {
    const currentLevel = selectCurrentLevel(getState())

    dispatch(editExistingItem('Level', currentLevel))
    dispatch({type: LEVEL_EDIT_START})
  }
}

export function handleStopEditingLevel(applyEdits = true) {
  return (dispatch, getState) => {
    const currentLevel = selectCurrentLevel(getState())

    // Determine if it's a new pilot based on the "current" slice contents
    const session = getEntitiesSession(getState())
    const {Level} = session

    const isNewLevel = !Level.hasId(currentLevel)

    dispatch({type: LEVEL_EDIT_STOP})

    if (applyEdits) {
      dispatch(applyItemEdits('Level', currentLevel))
    }

    dispatch(stopEditingItem('Level', currentLevel))

    if (isNewLevel) {
      dispatch({type: LEVEL_SELECT, payload: {currentLevel: null}})
    }
  }
}

export function stopEditingLevel() {
  return (dispatch, getState) => {
    dispatch(handleStopEditingLevel(true))
  }
}

export function cancelEditingLevel() {
  return (dispatch, getState) => {
    dispatch(handleStopEditingLevel(false))
  }
}

export function addNewLevel() {
  return (dispatch, getState) => {
    const session = getUnsharedEntitiesSession(getState())
    const {Level} = session

    const id = cuid()

    const newLevel = Level.generate({id})

    const levelContents = newLevel.toJSON()

    dispatch(editNewItem('Level', id, levelContents))
    dispatch(selectLevel(id))
    dispatch({type: LEVEL_EDIT_START})
  }
}
