import isEmpty from "lodash/isEmpty"
import config from "../../config"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import Course from "./course-model"
import User from "../user/user-model.js"
import {userByToken} from "../shared/resolver-functions.js"

const escapeRegex = text => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

/* 
** 
** @coursesById
**
** usage: 
** coursesById(courseIds) => {} 
**
** return: Given an array of course ids this will return an array of coureses that contain at least one of those ids.  
**
** notes: 
**
*/
const coursesById = async courseIds => {
  try {
    const courses = await Course.find({_id: {$in: courseIds}}).lean()
    return courses.map(course => {
      return {
        ...course,
        owner: userById.bind(this, course.owner)
      }
    })
  } catch (err) {
    throw err
  }
}
/* 
** 
** @mongooseToJs
**
** usage: 
** mongooseToJs(object) => {} 
**
** return: A new js object with a stringified _id and an owner Id.  The object to convert must have an owner property.
**
** notes: converts a mongoose object to a plain js object discarding mongoose meta data.   
**
*/
const mongooseToJs = object => {
  return {
    ...object._doc,
    _id: object._doc._id.toString(),
    owner: userById.bind(this, object._doc.owner)
  }
}

/* 
** 
** @userById
**
** usage: 
** userById(userId) => {} 
**
** return: 
**
** notes: 
**
*/

const userById = async userId => {
  try {
    const user = await User.findById(userId).lean()
    if (user) {
      return {
        ...user,
        createdCourses: coursesById.bind(this, user.createdCourses)
      }
    }
    return {
      username: ""
    }
  } catch (err) {
    throw err
  }
}

const getCourse = async (_, args, {user}) => {
  const course = await Course.findById(args._id)
    .lean()
    .exec()
  if (!course) {
    throw new Error("Cannot find course with id")
  }

  return course
}

const courseDelete = async (_, {id}, ctx) => {
  if (token === "null") {
    return new Error("You need to be registered to delete this resource.")
  }
  const token = ctx.req.headers.authorization
  const user = await userByToken(token, (err, res) => {
    if (err) return err
    return res
  })

  const course = await Course.findOneAndDelete({owner: user._id})
  if (!course) {
    throw new Error("No course found by this owner.")
  }

  if (course) {
    return true
  }
}

const courseUpdate = async (_, args, ctx) => {
  try {
    if (!ctx.isAuth) {
      return new Error("You need to be registered to edit this course.")
    }
    const {_id, ...update} = args
    const result = await Course.findByIdAndUpdate(_id, update, {
      new: true
    }).lean()
    /* .exec() */
  } catch (err) {
    throw err
  }
}

const courseCreate = async (_, args, ctx, info) => {
  try {
    if (!ctx.isAuth) {
      throw new Error("You need to be registered to create a course.")
    }

    const userId = ctx.req.token._id

    const user = await User.findById(userId, (err, res) => {
      if (err) return err
      return res
    })

    const newCourse = new Course({
      courseImage: args.input.courseImage,
      title: args.input.title,
      courseDescription: args.input.courseDescription,
      courseMode: args.input.courseMode,
      resources: args.input.resources,
      teachingLang: args.input.teachingLang,
      usingLang: args.input.usingLang,
      owner: user._id
    })

    let createdCourse

    const course = await newCourse.save()

    /* createdCourse = mongooseToJs(course) */

    createdCourse = {
      ...course._doc,
      _id: course._doc._id.toString(),
      owner: userById.bind(this, course._doc.owner)
    }

    const owner = await User.findById(userId)

    if (!owner) {
      throw new Error("User not found.")
    }
    owner.createdCourses.push(course)

    await owner.save()

    return createdCourse
  } catch (err) {
    throw err
  }
}

const getCourseLevels = async (_, args, ctx, info) => {
  // build query object
  const query = {}
  query.owner = ctx.user
}

const getCreatedCourses = async (_, args, ctx, info) => {
  try {
    if (!ctx.isAuth) {
      return new Error("You need to be registered to create a course.")
    }
    const token = ctx.req.headers.authorization
    const user = await userByToken(token, (err, res) => {
      if (err) return err
      return res
    })

    // build query object
    const query = {}
    query.owner = user._id
    // end query object

    if (args.cursor && args.cursor !== "done") {
      // type cast id, $lt is not the same in aggregate vs query
      var cursorObj = mongoose.Types.ObjectId(args.cursor)
      // add to query object
      var cursor = cursorObj
      query._id = {$lt: cursor}
    }

    const courses = await Course.find(query)
      .lean()
      /* .limit(3) */
      .sort({_id: -1})

    if (isEmpty(courses)) {
      return {courses: [], cursor: "done"}
    }

    const convertedCourses = courses.map(course => {
      return {
        ...course,
        owner: userById.bind(this, course.owner)
      }
    })

    const lastCourse = await Course.findOne().sort({field: "asc", _id: 1}) //TODO: index?
    cursor = convertedCourses[convertedCourses.length - 1]._id

    if (
      isEmpty(convertedCourses) ||
      lastCourse._doc._id.toString() === cursor
    ) {
      return {courses: convertedCourses, cursor: "done"}
    } else {
      return {courses: convertedCourses, cursor}
    }
  } catch (err) {
    throw err
  }
}

const getCourses = async (_, args, ctx, info) => {
  console.log("args: ", args.input)
  var input = args.input
  if (input.searchInput || input.selectionBox) {
    console.log("input: ", input.searchInput)
    input[input.selectionBox] = input.searchInput
    delete input.searchInput
    delete input.selectionBox
  }
  var query = {}
  for (var key in input) {
    input[key] !== "" ? (query[key] = input[key]) : null
  }
  console.log("query: ", query)
  try {
    const courses = await Course.find(query).lean()
    const convertedCourses = courses.map(course => {
      return {
        ...course,
        owner: userById.bind(this, course.owner)
      }
    })
    return {courses: convertedCourses, cursor: ""}
  } catch (err) {
    throw err
  }
  /* // build query object */
  /* const query = {} */
  /* var title, resources, owner */
  /* args.title */
  /*   ? (query.title = new RegExp(escapeRegex(args.title), "gi"))   : null */

  /* if (!isEmpty(args.resources)) { */
  /*   var newArray = [] */
  /*   args.resources.map(item => { */
  /*     const escapedStr = new RegExp(escapeRegex(item), "gi") */
  /*     newArray.push(escapedStr) */
  /*   }) */
  /*   query.resources = newArray */
  /* } else { */
  /*   null */
  /* } */
  /* if (args.owner) { */
  /*   var owner = await Course.findByUsername(args.owner, (err, docs) => { */
  /*     if (err) { */
  /*       // console.log doesn't work here */
  /*     } */
  /*     if (!isEmpty(docs)) { */
  /*       var owner = docs._id */
  /*       query.owner = owner */
  /*     } */
  /*   }) */
  /* } */

  /* args.usingLang 
    ? (query.usingLang = new RegExp(escapeRegex(args.usingLang), "gi"))
     : null */

  /* args.teachingLang 
     ? (query.teachingLang = new RegExp(escapeRegex(args.teachingLang), "gi"))  : null
   // end query object */

  /*   if (args.cursor && args.cursor !== "done") { */
  /*     // type cast id, $lt is not the same in aggregate vs query */
  /*     var cursor = mongoose.Types.ObjectId(args.cursor) */
  /*     // add to query object */
  /*     query._id = {$lt: cursor} */
  /*   } */

  /*   let result = await Course.find(query) */
  /*     .limit(3) */
  /*     .sort({_id: -1}) */
  /*     .exec() */

  /*   if (isEmpty(result)) { */
  /*     return {courses: [], cursor: "done"} */
  /*   } else { */
  /*     cursor = result[result.length - 1]._id */
  /*     return {courses: result, cursor} */
  /*   } */
}

const subscribe = async (_, args, ctx, info) => {
  const course = await Course.findOneAndUpdate(
    {_id: args.courseId},
    {$inc: {subscribers: 1}}
  )
  const userId = ctx.req.token._id
  try {
    const user = await User.findById(userId, (err, res) => {
      if (err) return err
      return res
    })
    user.subscriptions.push(course)

    const result = await user.save()
    if (result) {
      return course
    }
  } catch (err) {
    throw err
  }
}

const unsubscribe = async (_, args, ctx, info) => {
  const course = await Course.findOneAndUpdate(
    {
      _id: args.courseId,
      subscribers: {$gte: 1}
    },
    {$inc: {subscribers: -1}}
  )
  const userId = ctx.req.token._id

  try {
    const user = await User.findById(userId, (err, res) => {
      if (err) return err
      return res
    })
    user.subscriptions.pull(course)

    const result = await user.save()
    if (result) {
      return true
    }
  } catch (err) {
    throw err
  }
}

export const courseResolvers = {
  Query: {
    getCreatedCourses,
    getCourses,
    getCourse,
    getCourseLevels
  },
  Mutation: {
    courseDelete,
    courseUpdate,
    courseCreate,
    subscribe,
    unsubscribe
  }
  /* Course: { */
  /*   async owner(course) { */
  /*     const populated = await course.populate("owner").execPopulate() */

  /*     return populated.owner */
  /*   } */
  /* } */
}
