import {Model, many, fk, attr} from 'redux-orm'

export default class Course extends Model {
  static modelName = 'Course'

  static fields = {
    id: attr(),
    name: attr(),
    teaching: attr(),
    using: attr(),
    description: attr(),
    tags: attr()
  }

  static parse(courseData) {
    const {Pilot, Mech, Lance} = this.session

    const parsedData = {
      ...courseData,
      lances: courseData.lances.map(lanceEntry => Lance.parse(lanceEntry)),
      pilots: courseData.pilots.map(pilotEntry => Pilot.parse(pilotEntry)),
      mechs: courseData.mechs.map(mechEntry => Mech.parse(mechEntry))
    }

    return this.upsert(parsedData)
  }
}
