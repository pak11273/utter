import mongoose, {Schema} from "mongoose"

const LanguageSchema = mongoose.Schema(
  {
    skill: {
      type: String,
      enum: ["beginner", "intermediate", "fluent", "native"]
    },
    name: {
      type: String,
      default: ""
    },
    fans: [
      {
        username: {type: String, default: ""},
        email: {type: String, default: ""}
      }
    ],
    subscribers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    levels: {
      type: Number,
      vocabulary: Array,
      grammar: String
    },
    country: {
      type: String,
      default: ""
    },
    image: {
      type: String,
      default: "default.png"
    }
  },
  {timestamps: true}
)

export default mongoose.model("Language", LanguageSchema)
