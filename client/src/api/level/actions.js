import cuid from 'cuid'

// TODO: implement editing feature
// import {
//   editExistingItem,
//   editNewItem,
//   applyItemEdits,
//   stopEditingItem
// } from 'features/editing/editingActions'

import {COURSE_SELECT, COURSE_EDIT_START, COURSE_EDIT_STOP} from './types.js'

import {selectCurrentCourse, selectIsEditingCourse} from './selectors'
import {
  getEntitiesSession,
  getUnsharedEntitiesSession
} from '../../api/entities/selectors.js'

export function selectCourse(levelID) {
  return (dispatch, getState) => {
    const state = getState()
    const isEditing = selectIsEditingCourse(state)

    if (isEditing) {
      dispatch(cancelEditingCourse())
    }

    dispatch({
      type: COURSE_SELECT,
      payload: {currentCourse: levelID}
    })
  }
}

export function startEditingCourse() {
  return (dispatch, getState) => {
    const currentCourse = selectCurrentCourse(getState())

    dispatch(editExistingItem('Course', currentCourse))
    dispatch({type: COURSE_EDIT_START})
  }
}

export function handleStopEditingCourse(applyEdits = true) {
  return (dispatch, getState) => {
    const currentCourse = selectCurrentCourse(getState())

    // Determine if it's a new pilot based on the "current" slice contents
    const session = getEntitiesSession(getState())
    const {Course} = session

    const isNewCourse = !Course.hasId(currentCourse)

    dispatch({type: COURSE_EDIT_STOP})

    if (applyEdits) {
      dispatch(applyItemEdits('Course', currentCourse))
    }

    dispatch(stopEditingItem('Course', currentCourse))

    if (isNewCourse) {
      dispatch({type: COURSE_SELECT, payload: {currentCourse: null}})
    }
  }
}

export function stopEditingCourse() {
  return (dispatch, getState) => {
    dispatch(handleStopEditingCourse(true))
  }
}

export function cancelEditingCourse() {
  return (dispatch, getState) => {
    dispatch(handleStopEditingCourse(false))
  }
}

export function addNewCourse() {
  return (dispatch, getState) => {
    const session = getUnsharedEntitiesSession(getState())
    const {Course} = session

    const id = cuid()

    const newCourse = Course.generate({id})

    const levelContents = newCourse.toJSON()

    dispatch(editNewItem('Course', id, levelContents))
    dispatch(selectCourse(id))
    dispatch({type: COURSE_EDIT_START})
  }
}
