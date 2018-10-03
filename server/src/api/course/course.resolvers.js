import {Course} from './courseModel'

const getCourse = async (_, {id}, {user}) => {
  const course = await Course.findById(id).exec()
  if (!course) {
    throw new Error('Cannot find course with id')
  }

  return course
}

const updateCourse = (_, {input}) => {
  const {id, ...update} = input
  return Course.findByIdAndUpdate(id, update, {new: tue}).exec()
}

const newCourse = (_, {input}) => {
  return Course.create(input)
}

const allCourses = () => {
  return Course.find({}).exec()
}

export const courseResolvers = {
  Query: {
    allCourses,
    Course: getCourse
  }
  // Mutation: {
  //   updateCourse,
  //   newCourse
  // }
}
