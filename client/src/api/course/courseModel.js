import {Model, many, fk, attr} from 'redux-orm'

class Course extends Model {
  static parse(courseData) {
    this.delete()
    return this.upsert(courseData)
  }
  static reducer(action, Course, session) {
    switch (action.type) {
      case 'CREATE_COURSE':
        Course.create(action.payload)
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

// Declare your related fields.

Course.fields = {
  id: attr(),
  courseName: attr(),
  email: attr()
}

export default Course
