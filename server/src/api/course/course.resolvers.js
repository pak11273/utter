import Course from "./courseModel"
import mongoose from "mongoose"
import isEmpty from "lodash/isEmpty"

const escapeRegex = text => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

const getCourse = async (_, {id}, {user}) => {
  const course = await Course.findById(id).exec()
  if (!course) {
    throw new Error("Cannot find course with id")
  }

  return course
}

const updateCourse = (_, {input}) => {
  const {id, ...update} = input
  return Course.findByIdAndUpdate(id, update, {new: true}).exec()
}

const createCourse = (_, {input}) => {
  return Course.create(input)
}

const getCourses = async (_, args, ctx, info) => {
  // build query object
  const query = {}
  var courseName, courseRef, courseAuthor

  args.title
    ? (query.courseName = new RegExp(escapeRegex(args.title), "gi"))
    : null

  args.ref ? (query.courseRef = new RegExp(escapeRegex(args.ref), "gi")) : null

  if (args.author) {
    var courseAuthor = await Course.findByUsername(args.author, (err, docs) => {
      if (err) {
        // console.log doesn't work here
      }
      if (!isEmpty(docs)) {
        var courseAuthor = docs._id
        query.courseAuthor = courseAuthor
      }
    })
  }

  args.usingLang
    ? (query.usingLang = new RegExp(escapeRegex(args.usingLang), "gi"))
    : null

  args.teachingLang
    ? (query.teachingLang = new RegExp(escapeRegex(args.teachingLang), "gi"))
    : null
  // end query object

  if (args.cursor) {
    // type cast id, $lt is not the same in aggregate vs query
    var cursor = mongoose.Types.ObjectId(args.cursor)
    // add to query object
    query._id = {$lt: cursor}
  }

  let result = await Course.find(query)
    .limit(8)
    .sort({_id: -1})
    .exec()

  // if (!isEmpty(result)) {
  //   var last = result[result.length - 1]._id
  // } else {
  //   last = null
  // }

  // console.log("cursor: ", cursor)
  // console.log("last: ", last)

  // if (cursor === last || isEmpty(result)) {
  if (isEmpty(result)) {
    console.log("done: ", {courses: result, cursor})
    return {courses: [], cursor}
  } else {
    // cursor = result[result.length - 1]._id.toString()
    cursor = result[result.length - 1]._id
    return {courses: result, cursor}
  }
  // cursor = result[result.length - 1]._id
  // return {courses: result, cursor}
}

const getMoreCourses = async (_, args, ctx, info) => {
  console.log("args: ", args)
  // build query object
  const query = {}
  var courseName, courseRef, courseAuthor

  args.title
    ? (query.courseName = new RegExp(escapeRegex(args.title), "gi"))
    : null

  args.ref ? (query.courseRef = new RegExp(escapeRegex(args.ref), "gi")) : null

  if (args.author) {
    var courseAuthor = await Course.findByUsername(args.author, (err, docs) => {
      if (err) {
        // console.log doesn't work here
      }
      if (!isEmpty(docs)) {
        var courseAuthor = docs._id
        query.courseAuthor = courseAuthor
      }
    })
  }

  args.usingLang
    ? (query.usingLang = new RegExp(escapeRegex(args.usingLang), "gi"))
    : null

  args.teachingLang
    ? (query.teachingLang = new RegExp(escapeRegex(args.teachingLang), "gi"))
    : null
  // end query object

  // TODO: when sorting by subscribers, make cursor be the subscriber field instead of id
  // type cast id, $lt is not the same in aggregate vs query
  let cursor = mongoose.Types.ObjectId(args.cursor)
  // add to query object
  query._id = {$lt: cursor}

  let result = await Course.find(query)
    .limit(8)
    .sort({_id: -1})
    .exec()

  var last = result[result.length - 1]._id

  console.log("cursor: ", cursor)
  console.log("last: ", last)

  if (cursor === last) {
    cursor = "done"
    console.log("done: ", {courses: result, cursor})
    return {courses: [], cursor}
  } else {
    // cursor = result[result.length - 1]._id.toString()
    cursor = result[result.length - 1]._id
    return {courses: result, cursor}
  }
}

export const courseResolvers = {
  Query: {
    getCourses,
    getMoreCourses,
    getCourse
  },
  Mutation: {
    updateCourse,
    createCourse
  },
  Course: {
    async courseAuthor(course) {
      const populated = await course.populate("courseAuthor").execPopulate()

      return populated.courseAuthor
    }
  }
}
