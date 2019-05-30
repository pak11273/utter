import mongoose, {Schema} from "mongoose"
import User from "../user/user-model.js"
import {TermSchema} from "../term/term-model.js"
import Level from "../level/level-model.js"
import mongoosePaginate from "mongoose-paginate-v2"

const CourseSchema = mongoose.Schema(
  {
    cdn: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    levelSort: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: "",
      required: [true, "can't be blank"]
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
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
    resource: {
      type: String
    },
    teachingLang: {
      type: String,
      default: ""
    },
    usingLang: {
      type: String,
      default: ""
    },
    subscribers: {
      type: Array,
      default: []
    },
    subscriberCount: {type: Number, default: 0},
    levels: [
      {
        type: mongoose.Schema.Types.ObjectId,
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

// all indexes will be searched by $text operator, the more indexes, the slower $text becomes
CourseSchema.index({title: "text", resource: "text"})

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

CourseSchema.plugin(mongoosePaginate)

export default mongoose.model("Course", CourseSchema)
