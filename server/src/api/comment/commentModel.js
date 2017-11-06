import mongoose, {Schema} from 'mongoose'

const CommentSchema = mongoose.Schema({
  username: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('comment', CommentSchema)
