import mongoose, {Schema} from "mongoose"
import User, {UserSchema} from "../user/user-model.js"

export const TermSchema = new mongoose.Schema({
  term: {
    type: String,
    default: "Change me"
  },
  title: {
    type: String,
    default: "Change me"
  },
  grammar: String
})

TermSchema.virtual("id").get(function() {
  return this._id.toHexString()
})

TermSchema.set("toJSON", {
  virtuals: true
})

mongoose.model("Term", TermSchema)

TermSchema.index({termName: "text", termDescription: "text"})

TermSchema.statics.findByUsername = function(username, callback) {
  var query = this.findOne()

  User.findOne({username}).exec(callback)
  return query
}

TermSchema.virtual("id").get(function() {
  return this._id.toHexString()
})

TermSchema.set("toJSON", {
  virtuals: true
})

export default mongoose.model("Term", TermSchema)
