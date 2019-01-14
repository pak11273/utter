import {fk, attr, Model} from "redux-orm"

class Level extends Model {
  static parse(levelsData) {
    return this.upsert(levelsData)
  }

  static reducer(action, Level) {
    switch (action.type) {
      case "CREATE_LEVEL":
        Level.upsert(action.payload)
        break
      case "UPDATE_LEVEL":
        Level.withId(action.payload.id).update(action.payload)
        break
      case "REMOVE_LEVEL":
        /* const book = Level.withId(action.payload) */
        /* book.delete() */
        break
      case "ADD_AUTHOR_TO_LEVEL":
        Level.withId(action.payload.levelId).authors.add(action.payload.author)
        break
      case "REMOVE_AUTHOR_FROM_LEVEL":
        Level.withId(action.payload.levelId).authors.remove(
          action.payload.authorId
        )
        break
      default:
        break
    }
    // Return value is ignored.
  }

  toString() {
    return `Level: ${this.name}`
  }

  // Declare any static or instance methods you need.
}

Level.fields = {
  id: attr(),
  title: attr(),
  levelAuthor: fk("User", "levels")
}

Level.modelName = "Level"

export default Level
