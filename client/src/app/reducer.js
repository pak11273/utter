import {createReducer} from '../utils/reducerUtils'

import {DATA_LOADED} from '../layouts/Courses/features/Tools/types.js'

import orm from './schema'

const initialState = orm.getEmptyState()

export function loadData(state, payload) {
  // Create a Redux-ORM session from our entities "tables"
  const session = orm.session(state)
  // Get a reference to the correct version of model classes for this Session
  const {Unit, Faction, Level, Pilot, Mech, MechDesign, Term} = session

  const {levels, units, factions, designs, terms} = payload

  // Clear out any existing models from state so that we can avoid
  // conflicts from the new data coming in if data is reloaded
  ;[Unit, Faction, Level, Pilot, Mech, MechDesign].forEach(modelType => {
    modelType
      .all()
      .toModelArray()
      .forEach(model => model.delete())
  })

  // Immutably update the session state as we insert items
  Unit.parse(unit)

  factions.forEach(faction => Faction.parse(faction))
  designs.forEach(design => MechDesign.parse(design))

  // Return the new "tables" object containing the updates
  return session.state
}

export default createReducer(initialState, {
  [DATA_LOADED]: loadData
})
