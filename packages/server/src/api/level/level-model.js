import mongoose, {Schema} from "mongoose"
import Course from "../course/course-model.js"
import Vocabulary from "../vocabulary/vocabulary-model.js"
import {getPublicId} from "../../utils/cloudinary-utils.js"
var cloudinary = require("cloudinary").v2

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
  modifier: {
    type: String,
    default: ""
  },
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

const removeLinkedDocuments = async level => {
  try {
    // find all vocabulary with level_id and return array
    const vocabularies = await Vocabulary.find({level: level._id}).select({
      audioUrl: 1
    })
    const filteredVocabularies = vocabularies.map(item => {
      if (item.audioUrl) {
        const public_id = getPublicId(item.audioUrl)
        return public_id
      }
    })

    // bulk delete audioUrl from cdn
    if (filteredVocabularies.length > 0) {
      const public_ids = filteredVocabularies.reduce((acc, id) => {
        if (id) {
          const folder = "vocabulary-audio/"
          const public_id = folder + id
          acc.push(public_id)
          /* acc.push(id) */
        }
        return acc
      }, [])

      // api onlly accepts arrays of 100.  TODO: levels should be limited to 100 words
      cloudinary.api.delete_resources(
        public_ids,
        {resource_type: "video"},
        function(error, result) {
          console.log(error)
          console.log(result)
        }
      )

      await Vocabulary.deleteMany({level: level._id})
    }
  } catch (err) {
    throw err
  }
}

LevelSchema.post("findOneAndDelete", removeLinkedDocuments)

mongoose.model("Level", LevelSchema)

export default mongoose.model("Level", LevelSchema)
