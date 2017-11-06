import mongoose, {Schema} from 'mongoose'

const ZoneSchema = mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  zipCodes: {
    type: Array,
    default: []
  },
  numComments: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('zone', ZoneSchema)