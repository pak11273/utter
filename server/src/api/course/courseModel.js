import mongoose, {Schema} from 'mongoose'
import MongoPaging from 'mongo-cursor-pagination'

const TermSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  },
  level: {
    type: Schema.Types.ObjectId,
    ref: 'Level'
  },
  word: String,
  translation: String,
  audio: String
})

TermSchema.virtual('id').get(function() {
  return this._id.toHexString()
})

TermSchema.set('toJSON', {
  virtuals: true
})

const LevelSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  },
  level: Number,
  title: String,
  terms: [TermSchema],
  grammar: String
})

LevelSchema.virtual('id').get(function() {
  return this._id.toHexString()
})

LevelSchema.set('toJSON', {
  virtuals: true
})

mongoose.model('Level', LevelSchema)

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
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
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
    levels: [LevelSchema],
    // levels: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Level'
    //   }
    // ],
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

CourseSchema.virtual('id').get(function() {
  return this._id.toHexString()
})

CourseSchema.set('toJSON', {
  virtuals: true
})

CourseSchema.plugin(MongoPaging.mongoosePlugin)

module.exports = mongoose.model('Course', CourseSchema)
