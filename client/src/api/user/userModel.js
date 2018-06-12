import {fk, many, attr, Model} from 'redux-orm'

class User extends Model {
  static reducer(action, User, session) {
    switch (action.type) {
      case 'CREATE_USER':
        User.create(action.payload)
        break
      case 'UPDATE_USER':
        User.withId(action.payload.id).update(action.payload)
        break
      case 'REMOVE_USER':
        const book = User.withId(action.payload)
        book.delete()
        break
      case 'ADD_AUTHOR_TO_USER':
        User.withId(action.payload.userId).authors.add(action.payload.author)
        break
      case 'REMOVE_AUTHOR_FROM_USER':
        User.withId(action.payload.userId).authors.remove(
          action.payload.authorId
        )
        break
    }
    // Return value is ignored.
  }
  toString() {
    return `User: ${this.name}`
  }
  // Declare any static or instance methods you need.
}

User.modelName = 'User'

// Declare your related fields.

User.fields = {
  id: attr(),
  username: attr(),
  email: attr()
}

export default User
