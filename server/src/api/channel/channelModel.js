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
  })

module.exports = mongoose.model('channel', ChannelSchema)
