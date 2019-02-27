import * as sharedTypes from "./shared/types.js"
/* import * as userTypes from "./user/types.js" */
/* import * as usersTypes from "./users/types.js" */
/* import * as courseTypes from "../../course/types.js" */
/* import * as coursesTypes from "../../courses/types.js" */

import {createReducer} from "../utils/redux-utils.js"

import orm from "../core/schema.js"

const initialState = orm.getEmptyState()

// TODO: may implement this to clear out models for each load model data function below
// Clear out any existing models from state so that we can avoid conflicts from the new data coming in if data is reloaded
//  [ (Level, Courses, Users, etc)
//  ].forEach(modelType => {
//    modelType.all().withModels.forEach(model => model.delete())
//    session.state = session.reduce()
//    modelType
//      .all()
//      .toModelArray()
//      .forEach(model => model.delete())
//  })

/* export function resetCourses(state) { */
/*   const session = orm.session(state) */
/*   const {Courses} = session */
/*   Courses.delete() */
/*   return session.state */
/* } */

/* export function resetUser(state) { */
/*   const session = orm.session(state) */
/*   const {User} = session */
/*   User.delete() */
/*   return session.state */
/* } */

export function loadData(state, payload) {
  const session = orm.session(state)
  const entities = ["course", "level", "user", "zone"]
  const payloadKeys = Object.keys(payload)
  payloadKeys.map(key => {
    const upperCaseKey = key.charAt(0).toUpperCase() + key.slice(1)
    if (entities.includes(key)) {
      session[upperCaseKey].parse(payload[key])
    }
  })
  return session.state
}

export function resetGlobalLevel(state) {
  const session = orm.session(state)
  session.Level.reset()
  return session.state
}

/*
  ** @payload: String
	** ie. course, user, etc
*/
export function deleteData(state, payload) {
  const upperCasePayload =
    payload.data.charAt(0).toUpperCase() + payload.data.slice(1)
  const session = orm.session(state)
  const entity = session[upperCasePayload]
  entity.delete()
  return session.state
}

/* export function loadUsersData(state, payload) { */
/*   // Create a Redux-ORM session from our entities "tables" */
/*   const session = orm.session(state) */
/*   // Get a reference to the correct version of the Users class for this Session */
/*   const {Users} = session */

/*   const {users} = payload */
/*   // Queue up creation commands for each pilot entry */
/*   users.forEach(user => Users.parse(user)) */

/*   // Apply the queued updates and return the updated "tables" */
/*   return session.reduce() */
/* } */

/* export function loadCourse(state, payload) { */
/*   // Create a Redux-ORM session from our entities "tables" */
/*   const session = orm.session(state) */
/*   // Get a reference to the correct version of the Users class for this Session */
/*   const {Course} = session */
/*   const course = payload.payload.data */
/*   // let course = payload.payload */
/*   // add id by converting _id for each record */
/*   course.courseId = course._id */
/*   Course.parse(course) */

/*   const {Level} = session */
/*   // reset Level */
/*   Level.delete() */
/*   const {levels} = payload.payload.data */
/*   levels.forEach(level => Level.parse(level)) */

/*   const {Terms} = session */
/*   // reset Terms */
/*   Terms.delete() */
/*   levels.forEach(level => { */
/*     level.terms.forEach(term => { */
/*       Terms.parse(term) */
/*     }) */
/*   }) */

/*   return session.state */
/* } */

/* export function defaultUpdater(session, action) { */
/*   session.sessionBoundModels.forEach(modelClass => { */
/*     if (typeof modelClass.reducer === "function") { */
/*       // This calls this.applyUpdate to update this.state */
/*       modelClass.reducer(action, modelClass, session) */
/*     } */
/*   }) */
/* } */

/* export function loadCourses(state, payload) { */
/*   // Create a Redux-ORM session from our entities "tables" */
/*   const session = orm.session(state) */
/*   // Get a reference to the correct version of the Users class for this Session */
/*   const {Courses} = session */
/*   // reset the entity */
/*   // Courses.all().delete() */
/*   const courses = payload.payload.result || [] */
/*   // add id by converting _id for each record */
/*   courses.map(course => { */
/*     return (course.id = course._id) */
/*   }) */
/*   courses.forEach(course => Courses.parse(course)) */
/*   return session.state */
/* } */

export default createReducer(initialState, {
  [sharedTypes.LOAD_DATA_ASYNC.LOAD]: loadData,
  [sharedTypes.RESET_GLOBAL_LEVEL_ASYNC.RESET]: resetGlobalLevel,
  [sharedTypes.DELETE_DATA]: deleteData
  /* [courseTypes.COURSE_ASYNC.SUCCESS]: loadCourse */
  /* [coursesTypes.COURSES_ASYNC.SUCCESS]: loadCourses, */
  /* [coursesTypes.COURSES_ASYNC.RESET]: resetCourses */
})
