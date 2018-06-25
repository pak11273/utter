import {createReducer} from '../utils/reduxUtils.js'

import {DATA_LOADED} from '../layouts/Courses/features/Tools/types.js'

import orm from './schema.js'

const initialState = orm.getEmptyState()

export function loadData(state, payload) {
  // Create a Redux-ORM session from our entities "tables"
  const session = orm.session(state.entitiesReducer)
  // Get a reference to the correct version of the Pilots class for this Session
  const {Level, MechDesign, Mech, Pilot, Term} = session

  const {pilots, designs, levels, mechs, terms} = payload
  // Queue up creation commands for each pilot entry
  pilots.forEach(pilot => Pilot.parse(pilot))
  designs.forEach(design => MechDesign.parse(design))
  levels.forEach(level => Level.parse(level))
  mechs.forEach(mech => Mech.parse(mech))
  terms.forEach(term => Term.parse(term))

  // Apply the queued updates and return the updated "tables"
  return session.state
}

export default createReducer(initialState, {
  [DATA_LOADED]: loadData
})
