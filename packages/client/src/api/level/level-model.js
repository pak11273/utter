import {attr, Model} from "redux-orm"

class Level extends Model {
  static reset() {
    this.delete()
  }

  static parse(levelsData) {
    return this.upsert(levelsData)
  }

  toString() {
    return `Level: ${this.name}`
  }

  // Declare any static or instance methods you need.
}

Level.modelName = "Level"

Level.fields = {
  id: attr(),
  level: attr(),
  title: attr()
}

export default Level
