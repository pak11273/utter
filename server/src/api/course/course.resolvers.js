import Course from "./courseModel"
import isEmpty from "lodash/isEmpty"

var nextID
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
  // end query object

  let result = await Course.find(query).exec()
  // nextID = result[result.length - 1]._id
  return result
}

export const courseResolvers = {
  Query: {
    getCourses,
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
