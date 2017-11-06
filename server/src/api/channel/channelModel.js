import mongoose, {Schema} from 'mongoose'

const channelSchema = mongoose.Schema({
  channel: {
    type: String,
    default: ''
  },
  people: {
    type: Number,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('channel', channelSchema)
