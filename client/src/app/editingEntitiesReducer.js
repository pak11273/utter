import {createReducer} from '../utils/reducerUtils.js'

import orm from './schema'
const defaultEditingEntities = orm.getEmptyState()

export default createReducer(defaultEditingEntities, {})
