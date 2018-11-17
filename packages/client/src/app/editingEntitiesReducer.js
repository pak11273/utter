import {createReducer} from '../utils/reduxUtils.js'

import orm from './schema'
const defaultEditingEntities = orm.getEmptyState()

export default createReducer(defaultEditingEntities, {})
