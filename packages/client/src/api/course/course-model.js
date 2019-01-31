import {Model, fk, attr} from "redux-orm"

class Course extends Model {
  static parse(courseData) {
    this.delete()
    return this.upsert(courseData)
  }

  toString() {
    return `Course: ${this.name}`
  }
  // Declare any static or instance methods you need.
}

Course.modelName = "Course"

Course.fields = {
  id: attr(),
  courseName: attr(),
  email: attr(),
  owner: attr(),
  courseDescription: attr(),
  courseImage: attr(),
  courseMode: attr(),
  levels: fk("Level", "levels"),
  teachingLang: attr(),
  usingLang: attr()
}

export default Course
