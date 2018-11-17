import {Schema, ORM} from 'redux-orm'
import Course from '../api/course/courseModel.js'
import Courses from '../api/courses/coursesModel.js'
import Level from '../api/levels/levelsModel.js'
import ShoppingCart from '../api/shoppingCart/shoppingCartModel.js'
import Terms from '../api/terms/termsModel.js'
import User from '../api/user/userModel.js'
import Users from '../api/users/usersModel.js'

const orm = new ORM()
orm.register(Course, Courses, Level, ShoppingCart, Terms, User, Users)

export default orm
