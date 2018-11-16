import mongoose, {Schema} from 'mongoose'

const RoomSchema = Schema({
  channel_id: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: ''
  },
  level: {
    type: String,
    default: '1',
    required: [true, "can't be blank"]
  },
  creator: {
    type: String,
    default: ''
  },
  people: {
    type: Number,
    default: ''
  },
  private: Boolean,
  between: Array,
  title: {
    type: {
      type: String,
      unique: true
    },
    default: ''
  },
  title: {
    type: String,
    default: '',
    required: [true, "can't be blank"]
  }
},
  {timestamps: true}
)

export default mongoose.model('room', RoomSchema)
