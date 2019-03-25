import mongoose, {Schema} from "mongoose"
import User, {UserSchema} from "../user/user-model.js"
import {TermSchema} from "../term/term-model.js"
import {LevelSchema} from "../level/level-model.js"

const ZoneSchema = mongoose.Schema(
  {
    ageGroup: {
      type: String,
      default: "Any age"
    },
    app: {
      type: String,
      default: "Total Recall"
    },
    banned: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    courseLevel: {
      type: Number,
      default: 1
    },
    members: {
      type: Number,
      default: 0
    },
    zoneName: {
      type: String,
      default: "",
      required: [true, "can't be blank"]
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    zoneImage: {
      type: String,
      default:
        "https://res.cloudinary.com/dgvw5b6pf/image/upload/v1545873897/game-thumbnails/jon-tyson-762647-unsplash_vlvsyk"
    },
    zonePages: {
      type: Number,
      default: -1
    },
    zoneRef: [
      {
        type: mongoose.Schema.Types.Mixed,
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
    zoneDescription: {
      type: String,
      default: ""
    }
  },
  {timestamps: true}
)

ZoneSchema.index({zoneName: "text", zoneDescription: "text"})

ZoneSchema.statics.findByUsername = function(username, callback) {
  var query = this.findOne()

  User.findOne({username}).exec(callback)
  return query
}

ZoneSchema.virtual("id").get(function() {
  return this._id.toHexString()
})

ZoneSchema.set("toJSON", {
  virtuals: true
})

export default mongoose.model("Zone", ZoneSchema)
