import mongoose, {Schema} from "mongoose"
import Course from "../course/course-model.js"
import Level from "../level/level-model.js"

export const VocabularySchema = new Schema({
  word: {
    type: String,
    required: [true, "can't be blank"]
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "can't be blank"]
  },
  gender: {
    type: String
  },
  level: {
    type: Number
  },
  levelId: {
    type: Schema.Types.ObjectId,
    ref: "Level",
    required: [true, "can't be blank"]
  },
  translation: [
    {
      type: String,
      required: [true, "can't be blank"]
    }
  ]
})

mongoose.model("Vocabulary", VocabularySchema)

export default mongoose.model("Vocabulary", VocabularySchema)
