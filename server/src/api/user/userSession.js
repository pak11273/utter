import mongoose, {Schema} from "mongoose"

const UserSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      default: -1
    },
    timestamp: {
      type: Date,
      default: Date.now()
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {timestamps: true}
)

export default mongoose.model("User", UserSessionSchema)
