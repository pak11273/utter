import mongoose, {Schema} from 'mongoose'

const CourseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: ''
    },
    courseCreator: {
      type: String,
      default: ''
    },
    teachingLang: {
      type: String,
      default: ''
    },
    usingLang: {
      type: String,
      default: ''
    },
    tags: {
      type: String,
      default: ''
    },
    subscribers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    levels: {
      type: Number,
      vocabulary: Array,
      grammar: String
    },
    description: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: 'default.png'
    }
  },
  {timestamps: true}
)

module.exports = mongoose.model('Course', CourseSchema)
