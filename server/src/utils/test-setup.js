const mongoose = require("mongoose")

module.exports = async () => {
  // drop db
  mongoose.connect(
    "mongodb://localhost/test",
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(connection => {
    mongoose.connection.db.dropDatabase()
  })
}
