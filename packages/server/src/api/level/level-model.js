import mongoose, {Schema} from "mongoose"
import Course from "../course/course-model.js"
import Vocabulary from "../vocabulary/vocabulary-model.js"

export const LevelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "can't be blank"]
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "can't be blank"]
  },
  vocabulary: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vocabulary"
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
