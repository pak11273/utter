import mongoose, {Schema} from 'mongoose'

const SubscriptionSchema = new Schema(
  {
    title: {
      type: String
    },
    courses: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    favorite: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  {timestamps: true}
)

export default mongoose.model('Subscription', SubscriptionSchema)
