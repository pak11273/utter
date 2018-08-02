import {Model, many, fk, attr} from 'redux-orm'

class Courses extends Model {
  static get fields() {
    return {
      id: attr(),
      courseName: attr(),
      email: attr()
    }
  }

  static parse(courseData) {
    return this.upsert(courseData)
  }

  static reducer(action, Courses, session) {
    switch (action.type) {
      case 'CREATE_COURSES':
        Courses.upsert(action.payload)
        break
      case 'UPDATE_COURSES':
        Courses.withId(action.payload.id).update(action.payload)
        break
      case 'REMOVE_COURSES':
        const book = Courses.withId(action.payload)
        book.delete()
        break
    }
    // Return value is ignored.
  }
  toString() {
    return `Courses: ${this.name}`
  }
  // Declare any static or instance methods you need.
}

Courses.modelName = 'Courses'

export default Courses
