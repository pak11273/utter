import {createReducer} from '../utils/redux-utils.js'

import orm from './schema'
const defaultEditingEntities = orm.getEmptyState()

export default createReducer(defaultEditingEntities, {})
