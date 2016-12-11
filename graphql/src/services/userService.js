import UserModel from '../models/userModel'

export function createUser (user) {
  return UserModel.create(user)
}

export function findById (userId) {
  return UserModel.findOne({
    _id: userId
  }).lean()
}
