import {ENTITY_UPDATE, ENTITY_DELETE, ENTITY_CREATE} from '../types.js'
import {createConditionalSliceReducer} from '../../../utils/redux-utils.js'
import orm from '../../../app/schema.js'

export function createEntity(state, payload) {
  const {itemType, newItemAttributes} = payload.payload
  const session = orm.session(state)
  const ModelClass = session[itemType]

  ModelClass.parse(newItemAttributes)

  return session.state
}

export function updateEntity(state, payload) {
  const {itemType, itemID, newItemAttributes} = payload.payload
  const session = orm.session(state)
  const ModelClass = session[itemType]

  let newState = state

  if (ModelClass.hasId(itemID)) {
    const modelInstance = ModelClass.withId(itemID)

    modelInstance.update(newItemAttributes)
    newState = session.state
  }

  return newState
}

export function deleteEntity(state, payload) {
  const {itemID, itemType} = payload.payload
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

const entityHandlers = {
  [ENTITY_CREATE]: createEntity,
  [ENTITY_UPDATE]: updateEntity,
  [ENTITY_DELETE]: deleteEntity
}

const entityCrudReducer = createConditionalSliceReducer(
  'apiReducer',
  entityHandlers
)

export default entityCrudReducer
