import {Schema, ORM} from 'redux-orm'
import Course from '../api/course/courseModel.js'
import Courses from '../api/courses/coursesModel.js'
import Pilot from '../layouts/Courses/features/Pilots/Pilot'
import Mech from '../layouts/Courses/features/Mechs/mechModel.js'
import MechDesign from '../layouts/Courses/features/Mechs/mechDesignModel.js'
import Level from '../api/levels/levelsModel.js'
import Terms from '../api/terms/termsModel.js'
import User from '../api/user/userModel.js'
import Users from '../api/users/usersModel.js'

const orm = new ORM()
orm.register(
  Course,
  Courses,
  Level,
  Mech,
  MechDesign,
  Pilot,
  Terms,
  User,
  Users
)

export default orm
