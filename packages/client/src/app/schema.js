import {ORM} from "redux-orm"
import Course from "../api/course/course-model.js"
/* import Courses from "../api/courses/courses-model.js" */
import Level from "../api/level/level-model.js"
/* import ShoppingCart from "../api/shoppingCart/shoppingCartModel.js" */
/* import Term from "../api/term/term-model.js" */
import User from "../api/user/user-model.js"
import Zone from "../api/zone/zone-model.js"
/* import Users from "../api/users/users-model.js" */

const orm = new ORM()

orm.register(Course, Level, User, Zone)

export default orm
