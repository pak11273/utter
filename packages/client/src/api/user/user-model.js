import {attr, fk, Model} from "redux-orm"

class User extends Model {
  toString() {
    return `User: ${this.username}`
  }

  static parse(userData) {
    // NOTE: this in static methods refer to the class, not instances
    // Delete any existing user
    this.delete()
    return this.create(userData)
  }

  // Declare any static or instance methods you need.
}

User.fields = {
  id: attr(),
  email: attr(),
  password: attr(),
  roles: attr(),
  scopes: attr(),
  contacts: fk("User", "users"),
  username: attr(),
  courses: fk("Course", "users")
}

User.modelName = "User"

export default User
