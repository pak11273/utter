import {fk, many, attr, Model} from 'redux-orm'

class Users extends Model {
  static get fields() {
    return {
      id: attr(),
      username: attr(),
      email: attr()
    }
  }

  static parse(userData) {
    return this.upsert(userData)
  }

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
    }
    // Return value is ignored.
  }
  toString() {
    return `User: ${this.name}`
  }
  // Declare any static or instance methods you need.
}

Users.modelName = 'Users'

export default Users
