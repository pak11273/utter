import cuid from 'cuid'

import {
  editExistingItem,
  editNewItem,
  applyItemEdits,
  stopEditingItem
} from '../../containers/Editing/actions.js'

import {TERM_SELECT, TERM_EDIT_START, TERM_EDIT_STOP} from './types.js'

import {selectCurrentTerm, selectIsEditingTerm} from './selectors'
import {
  getEntitiesSession,
  getUnsharedEntitiesSession
} from '../entities/selectors.js'

export function selectTerm(termID) {
  return (dispatch, getState) => {
    const state = getState()
    const isEditing = selectIsEditingTerm(state)

    if (isEditing) {
      dispatch(cancelEditingTerm())
    }

    dispatch({
      type: TERM_SELECT,
      payload: {currentTerm: termID}
    })
  }
}

export function startEditingTerm() {
  return (dispatch, getState) => {
    const currentTerm = selectCurrentTerm(getState())

    dispatch(editExistingItem('Term', currentTerm))
    dispatch({type: TERM_EDIT_START})
  }
}

export function handleStopEditingTerm(applyEdits = true) {
  return (dispatch, getState) => {
    const currentTerm = selectCurrentTerm(getState())

    // Determine if it's a new term based on the "current" slice contents
    const session = getEntitiesSession(getState())
    const {Term} = session

    const isNewTerm = !Term.hasId(currentTerm)

    dispatch({type: TERM_EDIT_STOP})

    if (applyEdits) {
      dispatch(applyItemEdits('Term', currentTerm))
    }

    dispatch(stopEditingItem('Term', currentTerm))

    if (isNewTerm) {
      dispatch({type: TERM_SELECT, payload: {currentTerm: null}})
    }
  }
}

export function stopEditingTerm() {
  return (dispatch, getState) => {
    dispatch(handleStopEditingTerm(true))
  }
}

export function cancelEditingTerm() {
  return (dispatch, getState) => {
    dispatch(handleStopEditingTerm(false))
  }
}

export function addNewTerm() {
  return (dispatch, getState) => {
    const session = getUnsharedEntitiesSession(getState())
    const {Term} = session

    const id = cuid()

    const newTerm = Term.generate({id})

    const termContents = newTerm.toJSON()

    dispatch(editNewItem('Term', id, termContents))
    dispatch(selectTerm(id))
    dispatch({type: TERM_EDIT_START})
  }
}
