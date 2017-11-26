import mongoose, {Schema} from 'mongoose'

const channelSchema = mongoose.Schema({
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
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('channel', channelSchema)
