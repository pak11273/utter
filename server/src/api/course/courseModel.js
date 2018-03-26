import mongoose, {Schema} from 'mongoose'

const CourseSchema = mongoose.Schema(
  {
    courseId: {
      type: String,
      default: ''
    },
    courseName: {
      type: String,
      default: ''
    },
    courseCreatorId: {
      type: String,
      default: ''
    },
    courseMode: {
      type: String,
      default: 'draft'
    },
    coursePages: {
      type: Number,
      default: -1
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
      type: Array,
      default: ''
    },
    subscribers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    levels: [
      {
        cuid: String,
        level: Number,
        title: String,
        vocabulary: Array,
        grammar: String
      }
    ],
    courseDescription: {
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