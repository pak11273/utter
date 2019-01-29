import mongoose, {Schema} from "mongoose"
import Test from "../test/test-model.js"
import User from "../user/user-model.js"

const TestSchema = mongoose.Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    testId: {
      type: String,
      default: ""
    },
    testName: {
      type: String,
      default: "",
      required: [true, "can't be blank"]
    },
    testDescription: {
      type: String,
      default: ""
    },
    testSubject: {
      type: String,
      default: ""
    }
  },
  {timestamps: true}
)

TestSchema.index({testName: "text", testDescription: "text"})

TestSchema.statics.findByTestName = function(testname, callback) {
  var query = this.findOne()

  Test.findOne({testname}).exec(callback)
  return query
}

TestSchema.virtual("id").get(function() {
  return this._id.toHexString()
})

TestSchema.set("toJSON", {
  virtuals: true
})

export default mongoose.model("Test", TestSchema)
