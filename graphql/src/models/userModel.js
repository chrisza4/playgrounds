import Mongoose from 'mongoose'

const userSchemas = new Mongoose.Schema({
  email: {
    type: String,
    index: {
      unique: true
    }
  },
  created: {
    type: Date,
    default: Date.now,
    index: true
  }
})

export default Mongoose.model('users', userSchemas)
