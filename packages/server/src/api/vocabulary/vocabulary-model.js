import mongoose, {Schema} from "mongoose"
import Level from "../level/level-model.js"

const VocabularySchema = new mongoose.Schema({
  audioUrl: {
    type: String
  },
  partsOfSpeech: {
    type: String
  },
  word: {
    type: String,
    required: [true, "can't be blank"]
  },
  gender: {
    type: String
  },
  keyword: {
    type: String
  },
  level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Level"
  },
  tags: {
    type: Array
  },
  translation: {
    type: String,
    required: [true, "can't be blank"]
  }
})

mongoose.model("Vocabulary", VocabularySchema)

export default mongoose.model("Vocabulary", VocabularySchema)
