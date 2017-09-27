import mongoose, {Schema} from 'mongoose'

const RoomSchema = Schema({
  level: {
    type: String,
    default: '1'
  },
  creator: {
    type: String,
    default: ''
  },
  people: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('room', RoomSchema)
