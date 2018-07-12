import {Schema, ORM} from 'redux-orm'

import Pilot from '../layouts/Courses/features/Pilots/Pilot'
import Mech from '../layouts/Courses/features/Mechs/mechModel.js'
import MechDesign from '../layouts/Courses/features/Mechs/mechDesignModel.js'
import Unit from '../layouts/Courses/features/UnitInfo/Unit'
import Lance from '../layouts/Courses/features/UnitInfo/Lance'
import Level from '../api/level/level.js'
import Faction from '../layouts/Courses/features/UnitInfo/Faction'
import Term from '../api/terms/termModel.js'
import User from '../api/user/userModel.js'
import Users from '../api/users/usersModel.js'

const orm = new ORM()
orm.register(
  Faction,
  Lance,
  Level,
  Mech,
  MechDesign,
  Pilot,
  Term,
  Unit,
  User,
  Users
)

export default orm
