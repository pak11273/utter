import mongoose, {Schema} from "mongoose"
import User, {UserSchema} from "../user/user-model.js"
import Course from "../course/course-model.js"
import {TermSchema} from "../term/term-model.js"

export const LevelSchema = new Schema({
  level: {
    type: Number,
    required: [true, "can't be blank"]
  },
  title: {
    type: String,
    required: [true, "can't be blank"]
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "can't be blank"]
  },
  vocabulary: [
    {
      word: {type: String},
      translation: {type: String},
      audioUrl: String
    }
  ],
  grammar: [
    {
      rule: {type: String},
      example: {type: String},
      translation: {type: String},
      audioUrl: {type: String}
    }
  ],
  examples: [
    {
      example: {type: String},
      translation: {type: String},
      audioUrl: {type: String}
    }
  ],
  phrases: [
    {
      type: {type: String},
      formality: {type: String},
      phrase: {type: String},
      translation: {type: String},
      audioUrl: {type: String}
    }
  ],
  notes: {
    type: String
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
