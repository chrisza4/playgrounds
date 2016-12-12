import Mongoose from 'mongoose'

const roomSchema = new Mongoose.Schema({
  title: String,
  created: {
    type: Date,
    default: Date.now,
    index: true
  },
  members: Array
})

export default Mongoose.model('rooms', roomSchema)
