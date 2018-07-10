import {ENTITY_UPDATE, ENTITY_DELETE, ENTITY_CREATE} from './types.js'
import * as types from '../user/types.js'

// import {createConditionalSliceReducer} from '../../utils/reduxUtils.js'
import {createReducer} from '../../utils/reduxUtils.js'

import orm from '../../app/schema.js'

const initialState = orm.getEmptyState()

export function updateEntity(state, payload) {
  const {itemType, itemID, newItemAttributes} = payload

  const session = orm.session(state)
  const ModelClass = session[itemType]

  if (ModelClass.hasId(itemID)) {
    const modelInstance = ModelClass.withId(itemID)

    modelInstance.update(newItemAttributes)
  }

  return session.state
}

export function deleteEntity(state, payload) {
  const {itemID, itemType} = payload

  const session = orm.session(state)
  const ModelClass = session[itemType]

  if (ModelClass.hasId(itemID)) {
    const modelInstance = ModelClass.withId(itemID)

    // The session will immutably update its state reference
    modelInstance.delete()
  }

  // This will either be the original state object or the updated one
  return session.state
}

export function loadData(state, payload) {
  // Create a Redux-ORM session from our entities "tables"
  const session = orm.session(state)
  // Get a reference to the correct version of the Pilots class for this Session
  const {User} = session
  const loggedInUser = payload.payload.data.user
  // add id by converting _id
  loggedInUser.id = loggedInUser._id
  const users = [loggedInUser]
  users.forEach(user => User.parse(user))

  // User.parse(user)

  // Apply the queued updates and return the updated "tables"
  // return session.reduce()
  return session.state
}

export function createEntity(state, payload) {
  const {itemType, newItemAttributes} = payload

  const session = orm.session(state)
  const ModelClass = session[itemType]

  ModelClass.parse(newItemAttributes)

  return session.state
}

const entityHandlers = {
  [ENTITY_UPDATE]: updateEntity,
  [ENTITY_CREATE]: createEntity,
  [ENTITY_DELETE]: deleteEntity
}

// const entityCrudFeatureReducer = createConditionalSliceReducer(
// const entityCrudFeatureReducer = createConditionalSliceReducer(
//   'entities',
//   entityHandlers
// )

// export default entityCrudFeatureReducer
export default createReducer(initialState, {
  [types.LOGIN_ASYNC.SUCCESS]: loadData
})
