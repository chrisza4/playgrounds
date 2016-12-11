/// <reference path="../../../../typings/index.d.ts" />
import * as mongoose from 'mongoose'
import config from '../../config/main'

export interface User {
  email:    string
  password: string
  salt:     string
}

export interface UserModel extends User, mongoose.Document { 

}

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  }
})

export default mongoose.model<UserModel>('User', schema)