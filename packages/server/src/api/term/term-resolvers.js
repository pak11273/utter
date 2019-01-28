import {isEmpty} from "lodash"
import mongoose from "mongoose"
import Term from "./term-model"

const escapeRegex = text => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

const getTerm = async (_, {id}, {user}) => {
  const course = await Term.findById(id).exec()
  if (!course) {
    throw new Error("Cannot find course with id")
  }

  return course
}

const deleteTerm = async (_, {id}, ctx) => {
  console.log("id: ", id)
  const course = await Term.findById(id).exec()
  /* Term.findOneAndDelete({courseAuthor: user._id && id: id}) { */
  /* } */

  if (!course) {
    throw new Error("No course found.")
  }

  if (course.courseAuthor === id) {
    // TODO: delete course
  }

  return course
}

const updateTerm = (_, {input}) => {
  const {id, ...update} = input
  return Term.findByIdAndUpdate(id, update, {new: true}).exec()
}

const courseCreate = async (_, args, ctx, info) => {
  console.log("args: ", args)
  console.log("ctx: ", ctx.user)
  //TODO can't have duplicate course names
  const {input} = args
  input.courseAuthor = ctx.user
  const course = await Term.create(input)
  course.id = course._id
  console.log("course: ", typeof course)
  return course
}

const getCreatedTerms = async (_, args, ctx, info) => {
  // build query object
  const query = {}
  query.courseAuthor = ctx.user
  // end query object

  /* // TODO: HOTFIX, using a fake courseAuthor, delete this after testing */
  /* query.courseAuthor = "5b9012f043aa4329f187f01a" */
  /* end */

  if (args.cursor) {
    // type cast id, $lt is not the same in aggregate vs query
    var cursorObj = mongoose.Types.ObjectId(args.cursor)
    // add to query object
    var cursor = cursorObj
    query._id = {$lt: cursor}
  }

  let result = await Term.find(query)
    .limit(3)
    .sort({_id: -1})
    .exec()

  if (isEmpty(result)) {
    return {courses: [], cursor: "done"}
  } else {
    cursor = result[result.length - 1]._id
    return {courses: result, cursor}
  }
}

const getTerms = async (_, args, ctx, info) => {
  // build query object
  const query = {}
  var courseName, courseRef, courseAuthor

  args.title
    ? (query.courseName = new RegExp(escapeRegex(args.title), "gi"))
    : null

  args.ref ? (query.courseRef = new RegExp(escapeRegex(args.ref), "gi")) : null

  if (args.author) {
    var courseAuthor = await Term.findByUsername(args.author, (err, docs) => {
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

  let result = await Term.find(query)
    .limit(3)
    .sort({_id: -1})
    .exec()

  if (isEmpty(result)) {
    console.log("done")
    return {courses: [], cursor: "done"}
  } else {
    cursor = result[result.length - 1]._id
    return {courses: result, cursor}
  }
}

export const courseResolvers = {
  Query: {
    getCreatedTerms,
    getTerms,
    getTerm
  },
  Mutation: {
    deleteTerm,
    updateTerm,
    courseCreate
  },
  Term: {
    async courseAuthor(course) {
      const populated = await course.populate("courseAuthor").execPopulate()

      return populated.courseAuthor
    }
  }
}
