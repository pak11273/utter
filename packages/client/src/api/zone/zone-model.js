import {Model, fk, attr} from "redux-orm"

class Zone extends Model {
  static parse(zoneData) {
    this.delete()
    return this.upsert(zoneData)
  }

  toString() {
    return `Zone: ${this.name}`
  }
  // Declare any static or instance methods you need.
}

Zone.modelName = "Zone"

Zone.fields = {
  id: attr(),
  ageGroup: attr(),
  zoneName: attr(),
  owner: attr(),
  zoneDescription: attr(),
  teachingLang: attr(),
  usingLang: attr()
}

export default Zone
