import mongoose, {Schema} from 'mongoose'

const ZoneSchema = mongoose.Schema(
  {
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
  },
  {timestamps: true}
)

export default mongoose.model('Zone', ZoneSchema)
