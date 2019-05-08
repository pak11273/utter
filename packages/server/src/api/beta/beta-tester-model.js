import mongoose, {Schema} from "mongoose"
import bcrypt from "bcrypt"

export const BetaTesterSchema = new mongoose.Schema(
  {
    ageGroup: {
      type: Number
    },
    chosen: {
      type: Boolean,
      default: false
    },
    country: String,
    currentlyLearning: String,
    dayLearningHrs: String,
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      maxlength: [255, "can't be more than 255 characters"],
      index: true
    },
    firstName: {
      type: String
    },
    gender: {
      type: String,
      enum: ["male", "female"]
    },
    howLongLearning: String,
    lastName: {
      type: String
    },
    lagnuagesFluent: String,
    linkedIn: {
      type: String
    },
    nativeLange: {
      type: String
    },
    whyLearning: String
  },
  {timestamps: true}
)

export default mongoose.model("BetaTester", BetaTesterSchema)
