import mongoose, {Schema} from 'mongoose'
import User from '../user/userModel.js'

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
    cdn: {
      type: Schema.Types.Mixed,
      default: {}
    },
    courseId: {
      type: String,
      default: ''
    },
    courseName: {
      type: String,
      default: ''
    },
    courseAuthor: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    courseMode: {
      type: String,
      default: 'draft'
    },
    coursePages: {
      type: Number,
      default: -1
    },
    courseRef: {
      type: String,
      default: ''
    },
    teachingLang: {
      type: String,
      default: ''
    },
    nativeLang: {
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
    courseImage: {
      type: String,
      default:
        'https://res.cloudinary.com/dgvw5b6pf/image/upload/v1536857535/course-thumbnails/fa-image_kzo6kn.png'
    }
  },
  {timestamps: true}
)

CourseSchema.index({courseName: 'text', courseDescription: 'text'})

CourseSchema.statics.findByUsername = function(username, callback) {
  var query = this.findOne()

  User.findOne({username}).exec(callback)
  return query
}

CourseSchema.virtual('id').get(function() {
  return this._id.toHexString()
})

CourseSchema.set('toJSON', {
  virtuals: true
})

export default mongoose.model('Course', CourseSchema)
