import {Model, many, fk, attr} from 'redux-orm'

class Course extends Model {
  static get fields() {
    return {
      id: attr(),
      courseName: attr(),
      email: attr()
      // 1 course many levels
    }
  }

  static parse(courseData) {
    this.delete()
    return this.upsert(courseData)
  }

  static reducer(action, Course, session) {
    switch (action.type) {
      case 'CREATE_COURSE':
        Course.upsert(action.payload)
        break
      case 'UPDATE_COURSE':
        Course.withId(action.payload.id).update(action.payload)
        break
      case 'REMOVE_COURSE':
        const book = Course.withId(action.payload)
        book.delete()
        break
    }
    // Return value is ignored.
  }
  toString() {
    return `Course: ${this.name}`
  }
  // Declare any static or instance methods you need.
}

Course.modelName = 'Course'

export default Course
