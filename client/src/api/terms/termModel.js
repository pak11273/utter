import {fk, many, attr, Model} from 'redux-orm'

class Term extends Model {
  static reducer(action, Term, session) {
    switch (action.type) {
      case 'CREATE_TERM':
        Term.create(action.payload)
        break
      case 'UPDATE_TERM':
        Term.withId(action.payload.id).update(action.payload)
        break
      case 'REMOVE_TERM':
        const book = Term.withId(action.payload)
        book.delete()
        break
      case 'ADD_AUTHOR_TO_TERM':
        Term.withId(action.payload.termId).authors.add(action.payload.author)
        break
      case 'REMOVE_AUTHOR_FROM_TERM':
        Term.withId(action.payload.termId).authors.remove(
          action.payload.authorId
        )
        break
    }
    // Return value is ignored.
  }
  toString() {
    return `Term: ${this.name}`
  }
  // Declare any static or instance methods you need.
}

Term.modelName = 'Term'

// Declare your related fields.

Term.fields = {
  id: attr(),
  level: attr(),
  name: attr()
}

export default Term
