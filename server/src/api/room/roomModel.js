import mongoose, {Schema} from 'mongoose'

const RoomSchema = Schema({
  level: {
    type: String,
    default: ''
  },
  creator: {
    type: String,
    default: ''
  },
  people: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('room', RoomSchema)
