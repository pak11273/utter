import mongoose from "mongoose"
import faker from "faker"
import cuid from "cuid"
import {isEmpty} from "lodash/isEmpty"
import {languageOptions} from "../../seeds/data.js"

import Zone from "./zone-model.js"
const ObjectId = mongoose.Types.ObjectId

export default {
  faker: (req, res, next) => {
    const randNum = () => Math.floor(Math.random() * Math.floor(30))

    for (var i = 0; i < 1000; ++i) {
      var zone = new Zone()

      zone.zoneName = faker.random.arrayElement([
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
      zone.owner = faker.random.arrayElement([
        "5caa11c126bd462e4023657b",
        "5ccd04389b251025231a8446",
        "5ccd08c796e018284f6180a5",
        "5ccd041b9b251025231a8445",
        "5ccd0a0f96e018284f6180a6",
        "5ccd03d29b251025231a8444"
      ])
      zone.app = faker.random.arrayElement(["Carousel", "General Chat"])
      zone.course = faker.random.arrayElement(["5cb25c6515bf2342bfddfc0c"])
      zone.teachingLang = faker.random.arrayElement(languageOptions)
      zone.usingLang = faker.random.arrayElement(languageOptions)
      zone.zoneId = cuid()
      zone.zoneDescription = faker.lorem.paragraph()
      zone.zoneImage = faker.image.image()
      zone.courseLevel = randNum() // 1-30

      zone.save(function(err) {
        if (err) throw err
      })
    }
    res.json(zone)
  }
}
