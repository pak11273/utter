import mongoose from 'mongoose'
mongoose.connect('mongodb://192.168.68.8/utter')

const TodoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean
})

const Todo = mongoose.model('todo', TodoSchema)
Todo.create({
  name: 'blah',
  complete: false
}).then(function(err, todo) {
  console.log(err, todo)
})
