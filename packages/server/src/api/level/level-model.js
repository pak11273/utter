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
      gender: {type: String},
      levelId: {
        type: Schema.Types.ObjectId,
        ref: "Level"
      },
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

mongoose.model("Level", LevelSchema)

export default mongoose.model("Level", LevelSchema)
