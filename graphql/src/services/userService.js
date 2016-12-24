import UserModel from '../models/userModel'

export function createUser (user) {
  return UserModel.create(user)
}

export function findById (userId) {
  return UserModel.findOne({
    _id: userId
  }).lean()
}

export function findByEmail (email) {
  return UserModel.findOne({
    email
  }).lean()
}

export function findAll () {
  return UserModel.find({}).lean()
}
