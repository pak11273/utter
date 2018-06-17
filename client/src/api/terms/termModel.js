import {fk, many, attr, Model} from 'redux-orm'

class Term extends Model {
  static parse(pilotData) {
    // We could do useful stuff in here with relations,
    // but since we have no relations yet, all we need
    // to do is pass the pilot data on to create()

    // Note that in a static class method, `this` is the
    // class itself, not an instance
    return this.upsert(pilotData)
  }

  static generate(newAttributes = {}) {
    const combinedAttributes = {
      ...defaultAttributes,
      ...newAttributes
    }

    return this.create(combinedAttributes)
  }

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

  toJSON() {
    return {...this.ref}
  }

  updateFrom(otherPilot) {
    this.update(otherPilot.ref)
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
