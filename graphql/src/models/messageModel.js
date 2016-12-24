import Mongoose from 'mongoose'

const messageSchema = new Mongoose.Schema({
  body: String,
  created: {
    type: Date,
    default: Date.now,
    index: true
  },
  ownerId: {
    type: String,
    index: true
  },
  roomId: {
    type: String,
    index: true
  }
})

export default Mongoose.model('messages', messageSchema)
