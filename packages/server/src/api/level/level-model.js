import mongoose, {Schema} from "mongoose"
import User, {UserSchema} from "../user/user-model.js"
import Course from "../course/course-model.js"
import {TermSchema} from "../term/term-model.js"

export const LevelSchema = new Schema({
  level: Number,
  title: {
    type: String,
    default: "Change me"
  },
  Course: {
    type: Schema.Types.ObjectId,
    ref: "Course"
  }
})

LevelSchema.virtual("id").get(function() {
  return this._id.toHexString()
})

LevelSchema.set("toJSON", {
  virtuals: true
})

mongoose.model("Level", LevelSchema)

/* LevelSchema.index({levelTitle: "text"}) */

LevelSchema.statics.findByUsername = function(username, callback) {
  var query = this.findOne()

  User.findOne({username}).exec(callback)
  return query
}

LevelSchema.virtual("id").get(function() {
  return this._id.toHexString()
})

LevelSchema.set("toJSON", {
  virtuals: true
})

export default mongoose.model("Level", LevelSchema)
