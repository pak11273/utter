import mongoose from "mongoose"
import faker from "faker"
import cuid from "cuid"
import {isEmpty} from "lodash"

import Course from "./course-model.js"
const ObjectId = mongoose.Types.ObjectId
import {courseTitles, languageOptions} from "../../seeds/data.js"

export default {
  faker: (req, res, next) => {
    for (var i = 0; i < 1000; ++i) {
      var course = new Course()

      course.title = faker.random.arrayElement([
        "Aenean Donec venenatis",
        "Praesent egestas neque",
        "Fusce vel duii Fusce vel dui",
        "Nullam accumsan lorem",
        "Curabitur a felis",
        "Pellentesque auctor neque",
        "Fusce vel duFusce vel duii",
        "Mauris sollicitudin fermentum",
        "Suspendisse enim turpis",
        "Mauris sollicitudin fermentum",
        "Nullam nuNullam nulla ero eros"
      ])
      course.owner = faker.random.arrayElement([
        "5caa11c126bd462e4023657b",
        "5ccd04389b251025231a8446",
        "5ccd08c796e018284f6180a5",
        "5ccd041b9b251025231a8445",
        "5ccd0a0f96e018284f6180a6",
        "5ccd03d29b251025231a8444"
      ])
      course.mode = "edit"
      course.resource = faker.random.arrayElement([
        "top",
        "h-dog",
        "HELLO",
        "Bye",
        "_what_",
        "...nah",
        " ",
        " top "
      ])
      course.teachingLang = faker.random.arrayElement(languageOptions)
      course.usingLang = faker.random.arrayElement(languageOptions)
      course.subscribers = faker.random.number()
      course.courseId = cuid()
      course.title = faker.random.arrayElement(courseTitles)
      course.courseDescription = faker.lorem.paragraph()
      course.courseImage = faker.image.image()

      // console.log('course', course.levels[i]._id)
      course.save(function(err) {
        if (err) throw err
      })
    }
    res.json(course)
  }
}
