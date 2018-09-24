import mongoose, {Schema} from 'mongoose'

const ChannelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: ''
    },
    socket: {
      type: String,
      default: ''
    },
    people: {
      type: Number,
      default: ''
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('channel', ChannelSchema)
