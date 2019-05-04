import mongoose from "mongoose"
import faker from "faker"
import cuid from "cuid"
import {isEmpty} from "lodash/isEmpty"

import Zone from "./zone-model.js"
const ObjectId = mongoose.Types.ObjectId

export default {
  faker: (req, res, next) => {
    for (var i = 0; i < 3; ++i) {
      var zone = new Zone()

      console.log("zone: ", zone)
      // random object ids for terms.level
      var id1 = mongoose.Types.ObjectId()
      var id2 = mongoose.Types.ObjectId()
      var id3 = mongoose.Types.ObjectId()
      var id4 = mongoose.Types.ObjectId()
      zone.category = faker.commerce.department()
      zone.course = faker.random.arrayElement(["5cb25c6515bf2342bfddfc0c"])
      zone.teachingLang = faker.random.arrayElement([
        "korean",
        "french",
        "spanish"
      ])
      zone.usingLang = faker.random.arrayElement([
        "english",
        "french",
        "spanish"
      ])
      // TODO: change ids to ones in the db
      // zone.subscribers = faker.random.arrayElement([
      //   ["5b6b21e445912f4b8277bb06"],
      //   ["5b6b21e445912f4b8277bb06", "5b9012f043aa4329f187f01a"],
      //   [
      //     "5b6b21e445912f4b8277bb06",
      //     "5b93f9184d034f51d0e72287",
      //     "5b9012f043aa4329f187f01a"
      //   ],
      //   ["5b9012f043aa4329f187f01a"],
      //   ["5b9012f043aa4329f187f01a", "5b93f9184d034f51d0e72287"],
      //   [
      //     "5b9012f043aa4329f187f01a",
      //     "5b6b21e445912f4b8277bb06",
      //     "5b93f9184d034f51d0e72287"
      //   ],
      //   ["5b93f9184d034f51d0e72287"],
      //   ["5b93f9184d034f51d0e72287", "5b6b21e445912f4b8277bb06"],
      //   [
      //     "5b93f9184d034f51d0e72287",
      //     "5b9012f043aa4329f187f01a",
      //     "5b93f9184d034f51d0e72287"
      //   ]
      // ])
      zone.zoneId = cuid()
      zone.owner = faker.random.arrayElement([
        "5b9012f043aa4329f187f01a",
        "5b93f90c4d034f51d0e72286",
        "5baf12a86b73051f6295172b"
      ])
      zone.zoneName = faker.commerce.productName()
      zone.zoneDescription =
        "Nothing but a chicken wing. I dont like chicken wings, I like buffalo spicy hot wings with a little bit of wine.  There is nothing wrong with the sauce in chicken wings, but its so mild."
      zone.zoneImage = faker.image.image()
      zone.courseLevels = [{id: "5c37691a3bcc4427fcd1a4ec"}]

      zone.save(function(err) {
        if (err) throw err
      })
    }
    res.json(zone)
  }
}
