import {Schema, ORM} from 'redux-orm'
import Course from '../api/course/courseModel.js'
import Courses from '../api/courses/coursesModel.js'
import Pilot from '../layouts/Courses/features/Pilots/Pilot'
import Mech from '../layouts/Courses/features/Mechs/mechModel.js'
import MechDesign from '../layouts/Courses/features/Mechs/mechDesignModel.js'
import Unit from '../layouts/Courses/features/UnitInfo/Unit'
import Lance from '../layouts/Courses/features/UnitInfo/Lance'
import Level from '../api/levels/levelsModel.js'
import Faction from '../layouts/Courses/features/UnitInfo/Faction'
import Gooks from '../api/terms/termsModel.js'
import User from '../api/user/userModel.js'
import Users from '../api/users/usersModel.js'

const orm = new ORM()
orm.register(
  Course,
  Courses,
  Faction,
  Lance,
  Level,
  Mech,
  MechDesign,
  Pilot,
  Gooks,
  Unit,
  User,
  Users
)

export default orm
