import mongoose, {Schema} from 'mongoose'

const CommentSchema = mongoose.Schema({
  username: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  }
},
  {timestamps: true}
)

module.exports = mongoose.model('comment', CommentSchema)
