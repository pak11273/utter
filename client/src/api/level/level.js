import {fk, many, attr, Model} from 'redux-orm'

class Level extends Model {
  static reducer(action, Level, session) {
    switch (action.type) {
      case 'CREATE_LEVEL':
        Level.create(action.payload)
        break
      case 'UPDATE_LEVEL':
        Level.withId(action.payload.id).update(action.payload)
        break
      case 'REMOVE_LEVEL':
        const book = Level.withId(action.payload)
        book.delete()
        break
      case 'ADD_AUTHOR_TO_LEVEL':
        Level.withId(action.payload.levelId).authors.add(action.payload.author)
        break
      case 'REMOVE_AUTHOR_FROM_LEVEL':
        Level.withId(action.payload.levelId).authors.remove(
          action.payload.authorId
        )
        break
    }
    // Return value is ignored.
  }
  toString() {
    return `Level: ${this.name}`
  }
  // Declare any static or instance methods you need.
}

Level.modelName = 'Level'

// Declare your related fields.

Level.fields = {
  id: attr(),
  levelRank: attr(),
  levelName: attr()
}

export default Level
