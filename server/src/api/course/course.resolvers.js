import Course from "./courseModel"

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
  const regex = new RegExp(escapeRegex(args.title), "gi")
  let result = await Course.find({courseName: regex}).exec()
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
