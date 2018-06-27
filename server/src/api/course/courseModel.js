import mongoose, {Schema} from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const TermsSchema = new Schema({
  word: String,
  translation: String,
  audio: String
})

TermsSchema.virtual('id').get(function() {
  return this._id.toHexString()
})

TermsSchema.set('toJSON', {
  virtuals: true
})

const LevelsSchema = new Schema({
  level: Number,
  title: String,
  terms: [TermsSchema],
  grammar: String
})

LevelsSchema.virtual('id').get(function() {
  return this._id.toHexString()
})

LevelsSchema.set('toJSON', {
  virtuals: true
})

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
    levels: [LevelsSchema],
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

CourseSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Course', CourseSchema)
