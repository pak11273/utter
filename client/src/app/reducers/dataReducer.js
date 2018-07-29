import {createReducer} from '../../utils/reduxUtils.js'

// import {DATA_LOADED} from '../../layouts/Courses/features/Tools/types.js'
import {DATA_LOADED} from '../types.js'

import orm from '../schema.js'

const initialState = orm.getEmptyState()

export function loadData(state, payload) {
  // Create a Redux-ORM session from our entities "tables"
  const session = orm.session(state.dataReducer)
  // Get a reference to the correct version of the Users class for this Session
  const {Course, Levels, Terms} = session

  const {pilots, designs, levels, terms} = payload
  // Clear out any existing models from state so that we can avoid
  // conflicts from the new data coming in if data is reloaded
  ;[Course].forEach(modelType => {
    console.log('modelType: ', modelType)
    // modelType
    //   .all()
    //   .toModelArray()
    //   .forEach(model => model.delete())
  })

  // Queue up creation commands for each pilot entry
  levels.forEach(level => Level.parse(level))
  terms.forEach(term => Terms.parse(term))

  // Apply the queued updates and return the updated "tables"
  return session.state
}

export default createReducer(initialState, {
  [DATA_LOADED]: loadData
})
