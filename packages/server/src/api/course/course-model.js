import mongoose, {Schema} from "mongoose"
import User from "../user/user-model.js"
import {TermSchema} from "../term/term-model.js"
import Level from "../level/level-model.js"

const CourseSchema = mongoose.Schema(
  {
    cdn: {
      type: Schema.Types.Mixed,
      default: {}
    },
    courseId: {
      type: String,
      default: ""
    },
    courseName: {
      type: String,
      default: "",
      required: [true, "can't be blank"]
    },
    courseAuthor: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    courseMode: {
      type: String,
      default: "draft"
    },
    coursePages: {
      type: Number,
      default: -1
    },
    courseRef: [
      {
        type: Schema.Types.Mixed,
        default: {}
      }
    ],
    teachingLang: {
      type: String,
      default: ""
    },
    usingLang: {
      type: String,
      default: ""
    },
    subscribers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    levels: [
      {
        type: Schema.Types.ObjectId,
        ref: "Level"
      }
    ],
    courseDescription: {
      type: String,
      default: ""
    },
    courseImage: {
      type: String,
      default:
        "https://res.cloudinary.com/dgvw5b6pf/image/upload/v1536857535/course-thumbnails/fa-image_kzo6kn.png"
    }
  },
  {timestamps: true}
)

CourseSchema.index({courseName: "text", courseDescription: "text"})

CourseSchema.statics.findByUsername = function(username, callback) {
  var query = this.findOne()

  User.findOne({username}).exec(callback)
  return query
}

CourseSchema.virtual("id").get(function() {
  return this._id.toHexString()
})

CourseSchema.set("toJSON", {
  virtuals: true
})

export default mongoose.model("Course", CourseSchema)
